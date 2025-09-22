import React from 'react';
import Breadcrumb from './Breadcrumb';

const BreadcrumbStories = () => {
  const breadcrumbItems = [
    { label: 'Beranda', href: '#' },
    { label: 'Kegiatan Sekolah', href: '#' },
    { label: 'Prestasi Siswa' }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Breadcrumb Stories</h1>
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
};

export default BreadcrumbStories;