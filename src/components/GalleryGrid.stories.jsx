import React from 'react';
import GalleryGrid from './GalleryGrid';

const GalleryGridStories = () => {
  const images = [
    { 
      src: 'https://placehold.co/600x400', 
      alt: 'Kegiatan Ekstrakurikuler',
      caption: 'Siswa dalam kegiatan ekstrakurikuler seni tari'
    },
    { 
      src: 'https://placehold.co/600x400', 
      alt: 'Laboratorium Komputer',
      caption: 'Siswa belajar di laboratorium komputer'
    },
    { 
      src: 'https://placehold.co/600x400', 
      alt: 'Perpustakaan Sekolah',
      caption: 'Siswa membaca di perpustakaan sekolah'
    },
    { 
      src: 'https://placehold.co/600x400', 
      alt: 'Upacara Bendera',
      caption: 'Upacara bendera setiap Senin pagi'
    },
    { 
      src: 'https://placehold.co/600x400', 
      alt: 'Kelas Pembelajaran',
      caption: 'Suasana kelas saat proses belajar mengajar'
    },
    { 
      src: 'https://placehold.co/600x400', 
      alt: 'Olahraga Sekolah',
      caption: 'Turnamen basket antar kelas'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gallery Grid Stories</h1>
      <GalleryGrid images={images} columns={3} />
    </div>
  );
};

export default GalleryGridStories;