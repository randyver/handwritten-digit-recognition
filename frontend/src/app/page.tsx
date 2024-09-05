import DigitInput from "@/components/digit-input";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-5">Digit Recognition</h1>
      <DigitInput />
    </div>
  );
}
