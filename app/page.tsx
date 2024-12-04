import CategorySelector from '@/components/CategorySelector';

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-100">แบบทดสอบคำศัพท์</h1>
          <CategorySelector />
      </div>
    </main>
  );
}
