const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const mongoose = require('mongoose');

const router = express.Router();


router.get("/balance", authMiddleware, async (req, res) => {
    try{
    const account = await Account.findOne({
        userId: req.user.userId
    });

    res.json({
        balance: account.balance
    })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            msg:"Server error. Couldn't get the balance, please try again."
        })
    }
});


router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { amount, to } = req.body;

        // Validate input data
        if (amount <= 0) {
            return res.status(400).json({ msg: "Transfer amount must be positive." });
        }

        if (!mongoose.Types.ObjectId.isValid(to)) {
            return res.status(400).json({ msg: "Invalid recipient account ID." });
        }

        // Fetch the sender's account
        const senderAccount = await Account.findOne({ userId: req.user.userId }).session(session);
        if (!senderAccount) {
            await session.abortTransaction();
            return res.status(404).json({ msg: "Sender account not found." });
        }

        if (senderAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ msg: "Insufficient balance." });
        }

        // Fetch the recipient's account
        const recipientAccount = await Account.findOne({ userId: to }).session(session);
        if (!recipientAccount) {
            await session.abortTransaction();
            return res.status(404).json({ msg: "Recipient account not found." });
        }

        // Perform the transfer
        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } }
        ).session(session);

        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } }
        ).session(session);

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ msg: "Transfer successful." });
    } catch (error) {
        console.error("Error during transfer:", error);
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ msg: "Server error. Transfer failed, please try again." });
    }
});


module.exports = router;