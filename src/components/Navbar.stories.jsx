import React from 'react';
import PropTypes from 'prop-types';

const NavbarStories = () => {
  const navItems = [
    { label: 'Beranda', href: '#' },
    { 
      label: 'Profil', 
      subItems: [
        { label: 'Sejarah Sekolah', href: '#' },
        { label: 'Visi & Misi', href: '#' },
        { label: 'Struktur Organisasi', href: '#' }
      ]
    },
    { label: 'Akademik', href: '#' },
    { label: 'Kegiatan', href: '#' },
    { label: 'Berita', href: '#' },
    { label: 'PPDB', href: '#' }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Navbar Stories</h1>
      <Navbar 
        logoText="SMP Negeri 1 Jakarta" 
        navItems={navItems} 
        ctaText="Kontak Kami" 
      />
    </div>
  );
};

export default NavbarStories;