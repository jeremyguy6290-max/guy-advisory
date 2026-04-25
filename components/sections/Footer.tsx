import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0f4c5c] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          <div>
            {/* Transparent icon — no filter needed; teal reads clearly on dark navy */}
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/images/Guy Advisory Icon Logo Transparent copy.png"
                alt=""
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="text-white/90 text-sm font-medium tracking-widest uppercase">
                Guy Advisory
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <a
                href="mailto:erica@guyadvisory.com"
                className="text-sm text-white/55 hover:text-white transition-colors"
              >
                erica@guyadvisory.com
              </a>
              <a
                href="mailto:nathan@guyadvisory.com"
                className="text-sm text-white/55 hover:text-white transition-colors"
              >
                nathan@guyadvisory.com
              </a>
            </div>
          </div>

          <p className="text-xs text-white/30 tracking-wide">
            &copy; {year} Guy Advisory. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
