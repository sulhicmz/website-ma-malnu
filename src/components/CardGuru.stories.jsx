import React from 'react';
import CardGuru from './CardGuru';

const CardGuruStories = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Card Guru Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardGuru 
          name="Budi Santoso, S.Pd"
          subject="Guru Matematika"
          bio="10 tahun pengalaman mengajar matematika untuk tingkat SMA dengan metode yang interaktif dan menyenangkan."
          imageUrl="https://placehold.co/300x400"
          imageAlt="Foto Guru"
        />
        <CardGuru 
          name="Siti Rahayu, S.Pd"
          subject="Guru Bahasa Indonesia"
          bio="Guru berpengalaman dalam meningkatkan keterampilan membaca dan menulis siswa dengan pendekatan kreatif."
          imageUrl="https://placehold.co/300x400"
          imageAlt="Foto Guru"
        />
        <CardGuru 
          name="Ahmad Fauzi, S.Pd"
          subject="Guru IPA"
          bio="Spesialis dalam pembelajaran berbasis eksperimen yang membuat konsep sains mudah dipahami siswa."
          imageUrl="https://placehold.co/300x400"
          imageAlt="Foto Guru"
        />
      </div>
    </div>
  );
};

export default CardGuruStories;