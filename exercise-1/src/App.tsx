import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center w-80">
        <h1 className="text-2xl font-bold mb-6">Counter App</h1>

        <p className="text-5xl font-bold text-gray-800 mb-8">{count}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setCount((c) => c - 1)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Decrease
          </button>

          <button
            onClick={() => setCount((c) => c + 1)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Increase
          </button>
        </div>

        <button
          onClick={() => setCount(0)}
          className="mt-6 w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;