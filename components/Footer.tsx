import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="border-t border-black text-center py-6">
        <Image
          src="/WFHlogo 3.png"
          alt="WFH Studios Logo"
          width={80}
          height={60}
          className="mx-auto"
        />
      </div>
    </footer>
  );
}

