export default function (
    { children }: { children: React.ReactNode }
) {

    return <div>
        <div className="border-b text-center">
            20% off on next 10 days
        </div>
        {children}
    </div>
}