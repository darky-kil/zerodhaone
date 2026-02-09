export default function App() {
  return (
    <div className="size-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex items-center justify-center overflow-hidden relative">
      {/* Large "1" in the background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 -translate-y-17">
        <span className="text-[30rem] font-black text-white leading-none select-none">
          1
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-8">
        <h1 className="text-8xl md:text-9xl font-black text-white tracking-tight mb-6 drop-shadow-2xl">
          ZERODHA
        </h1>
        <div className="h-2 w-32 bg-blue-400 mx-auto mb-8"></div>
        <p className="text-2xl md:text-3xl text-blue-100 font-light tracking-wide">
          Next Generation Trading Platform
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 border-4 border-blue-400 opacity-20 rotate-45"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 border-4 border-blue-300 opacity-20 rotate-12"></div>
    </div>
  );
}