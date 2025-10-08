export default function Header() {
  return (
    <header className="bg-white border-b border-black p-4">
      <div className="">
        <div className="flex items-center h-16">
          <div className="flex-1"></div>
          <a 
            href="https://instagram.com/wfhstudios_" 
            target="_blank" 
            rel="noreferrer"
            className="underline font-crimson-text text-wfh-blue"
          >
            CLICK HERE if you need a website
          </a>
          <div className="flex-1 flex justify-end">
            <a 
              href="https://instagram.com/wfhstudios_" 
              target="_blank" 
              rel="noreferrer"
              className="font-crimson-text text-wfh-blue"
            >
              @wfhstudios_
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

