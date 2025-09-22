import React from 'react';
import Footer from './Footer';

const FooterStories = () => {
  const quickLinks = [
    { label: 'Beranda', href: '#' },
    { label: 'Profil Sekolah', href: '#' },
    { label: 'Akademik', href: '#' },
    { label: 'Kegiatan Sekolah', href: '#' },
    { label: 'Berita', href: '#' },
    { label: 'PPDB', href: '#' }
  ];

  const contactInfo = {
    address: 'Jl. Merdeka No. 123, Jakarta Pusat, DKI Jakarta 10110',
    phone: '(021) 12345678',
    email: 'info@smpn1jakarta.sch.id'
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Footer Stories</h1>
      <Footer 
        schoolName="SMP Negeri 1 Jakarta"
        description="Sekolah unggulan yang berkomitmen untuk memberikan pendidikan berkualitas dan membentuk karakter siswa yang unggul."
        quickLinks={quickLinks}
        contactInfo={contactInfo}
        copyrightText="&copy; 2023 SMP Negeri 1 Jakarta. Hak Cipta Dilindungi."
      />
    </div>
  );
};

export default FooterStories;