import React from 'react';
import CardBerita from './CardBerita';

const CardBeritaStories = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Card Berita Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardBerita 
          category="Berita"
          date="12 April 2023"
          title="Prestasi Siswa dalam Lomba Sains Nasional"
          excerpt="Tim sains sekolah kita berhasil meraih juara pertama dalam lomba sains tingkat nasional yang diadakan di Jakarta minggu lalu."
          imageUrl="https://placehold.co/400x300"
          imageAlt="Gambar Berita"
        />
        <CardBerita 
          category="Kegiatan"
          date="5 April 2023"
          title="Pelatihan Kepemimpinan Siswa"
          excerpt="Sekolah mengadakan pelatihan kepemimpinan bagi para siswa kelas IX untuk mempersiapkan mereka menghadapi tantangan di masa depan."
          imageUrl="https://placehold.co/400x300"
          imageAlt="Pelatihan Kepemimpinan"
        />
        <CardBerita 
          category="Prestasi"
          date="28 Maret 2023"
          title="Juara Lomba Paduan Suara Antar Sekolah"
          excerpt="Paduan suara sekolah berhasil meraih juara kedua dalam lomba paduan suara antar sekolah se-DKI Jakarta."
          imageUrl="https://placehold.co/400x300"
          imageAlt="Paduan Suara"
        />
      </div>
    </div>
  );
};

export default CardBeritaStories;