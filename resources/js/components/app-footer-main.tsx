import AppLogo from './app-logo';
import { Instagram, Facebook, Phone } from 'lucide-react';
import AppLogoIcon from './app-logo-icon';

interface FooterProps {
    info: {
        address?: string;
        phone_number?: string;
        facebook?: string;
        instagram?: string;
        tiktok?: string;
        twitter?: string;
        tag_line?: string;
        sub_tag_line?: string;
        about?: string;
    }
}

export default function AppFooterMain(props: FooterProps) {
    const { info } = props;
    return (
        <footer className="mt-auto bg-[#0C0C0C] border-t-2 border-[#F6C44B] text-white py-8 px-4">
            <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                {/* Logo */}
                <div className="flex flex-col items-center md:items-start">
                    <AppLogoIcon className='h-[130px] w-[200px] object-contain' />
                    {/* <span className="mt-2 font-bold text-lg">filosofiakik <span className="text-blue-400">&#10003;</span></span> */}
                </div>
                {/* Alamat */}
                <div className="text-center md:text-left max-w-md">
                    <div className="font-bold text-lg mb-2">Alamat Kami</div>
                    <div className="font-semibold break-words">
                        {info?.address}
                    </div>
                </div>
                {/* Kontak */}
                <div className="flex flex-col items-center md:items-end gap-2">
                    <div className="font-bold text-lg mb-2">Contact</div>
                    <div className="flex items-center gap-2">
                        <Phone className="text-green-400" size={20} />
                        <span className="font-semibold break-words">{info?.phone_number}</span>
                    </div>
                    {info?.instagram && (
                        <div className="flex items-center gap-2">
                            <Instagram className="text-pink-400" size={20} />
                            <a href={`https://www.instagram.com/${info?.instagram}`} className="font-semibold break-words">{info?.instagram}</a>
                        </div>
                    )}
                    {info?.facebook && (
                        <div className="flex items-center gap-2">
                            <Facebook className="text-blue-500" size={20} />
                            <span className="font-semibold break-words">{info?.facebook}</span>
                        </div>
                    )}
                    {/* Tambahkan tiktok, twitter jika ingin */}
                </div>
            </div>
        </footer>
    );
}
