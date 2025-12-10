export default function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 p-5 text-center text-gray-400 uppercase">
      &copy; {date} #vanlife
    </footer>
  );
}
