export default function Footer() {
    return (
      <footer className="bg-blue-500 bottom-0 left-0 w-full p-4 mt-4">
        <div className="container mx-auto text-center text-white">
          &copy; {new Date().getFullYear()} Next Blog. Todos os direitos reservados.
        </div>
      </footer>
    );
}