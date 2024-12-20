export function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} AI Name Generator. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 