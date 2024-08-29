import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchBar({ search, setSearch }) {
    return (
        <div className="flex items-center justify-center p-2">
            <MagnifyingGlassIcon className="w-5 h-5 mr-2 text-gray-700" />
            <input
                type="text"
                className="w-80 p-2 m-4 text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Pesquisar tarefas..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
            />
        </div>
    );
}