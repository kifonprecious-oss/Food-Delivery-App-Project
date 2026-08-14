export default function Footer() {
    return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-bold text-white text-lg">
            <span>BillionzBites</span>
        </div>
        <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} BillionzBites. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
        </div>
        </div>
    </footer>
    );
}