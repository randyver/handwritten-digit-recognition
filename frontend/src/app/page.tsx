import DigitInput from "@/components/digit-input";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#021526] to-[#03346E] relative overflow-hidden">
      <h1 className="text-4xl font-bold mb-5 text-white z-10">Digit Recognition</h1>
      <DigitInput />

      {/* Futuristic grid and diagonal lines (beneath DigitInput) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        
        {/* Diagonal lines */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent h-full w-full opacity-20"
          style={{ backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(225deg, rgba(255,255,255,0.1) 25%, transparent 25%)", backgroundSize: "40px 40px" }}></div>

        {/* Grid-like pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>
    </div>
  );
}
