import { Head, Link } from '@inertiajs/react';

interface Props {
    canLogin: boolean;
    canRegister: boolean;
    [key: string]: unknown;
}

export default function Welcome({ canLogin, canRegister }: Props) {
    return (
        <>
            <Head title="EduPlatform - Sistem Pembelajaran Sekolah">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                {/* Navigation */}
                <nav className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">📚</span>
                        </div>
                        <span className="text-xl font-bold text-gray-800">EduPlatform</span>
                    </div>
                    
                    {canLogin && (
                        <div className="flex items-center space-x-4">
                            <Link
                                href={route('login')}
                                className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
                            >
                                Masuk
                            </Link>
                            {canRegister && (
                                <Link
                                    href={route('register')}
                                    className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all transform hover:scale-105 shadow-lg"
                                >
                                    Daftar
                                </Link>
                            )}
                        </div>
                    )}
                </nav>

                {/* Hero Section */}
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                            🎓 <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">EduPlatform</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Sistem pembelajaran digital yang menghubungkan admin, guru, dan murid dalam satu platform terintegrasi
                        </p>
                        
                        {canLogin && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('login')}
                                    className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all transform hover:scale-105 shadow-lg"
                                >
                                    🚀 Mulai Belajar
                                </Link>
                                {canRegister && (
                                    <Link
                                        href={route('register')}
                                        className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all"
                                    >
                                        📝 Daftar Sekarang
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {/* Admin Features */}
                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-white text-2xl">👨‍💼</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Panel Admin</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> Kelola semua pengguna</li>
                                <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> Monitor sistem</li>
                                <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> Laporan lengkap</li>
                                <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> Pengaturan global</li>
                            </ul>
                        </div>

                        {/* Teacher Features */}
                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-white text-2xl">👨‍🏫</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Portal Guru</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> Kelola mata pelajaran</li>
                                <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> Buat materi & ujian</li>
                                <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> Upload konten multimedia</li>
                                <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> Penilaian otomatis</li>
                            </ul>
                        </div>

                        {/* Student Features */}
                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-white text-2xl">👨‍🎓</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Area Murid</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> Akses materi pelajaran</li>
                                <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> Ikuti ujian online</li>
                                <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> Lihat hasil & progress</li>
                                <li className="flex items-center"><span className="text-green-500 mr-2">✅</span> Jadwal pelajaran</li>
                            </ul>
                        </div>
                    </div>

                    {/* Content Types */}
                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                        <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
                            📋 Jenis Konten Pembelajaran
                        </h3>
                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">📝</span>
                                </div>
                                <h4 className="font-semibold text-gray-800">Teks</h4>
                                <p className="text-sm text-gray-600">Artikel & dokumen</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">🎞️</span>
                                </div>
                                <h4 className="font-semibold text-gray-800">Slide</h4>
                                <p className="text-sm text-gray-600">Presentasi visual</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">🖼️</span>
                                </div>
                                <h4 className="font-semibold text-gray-800">Gambar</h4>
                                <p className="text-sm text-gray-600">Ilustrasi & diagram</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">🎬</span>
                                </div>
                                <h4 className="font-semibold text-gray-800">Video</h4>
                                <p className="text-sm text-gray-600">Pembelajaran interaktif</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    {canLogin && (
                        <div className="text-center mt-16">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white">
                                <h3 className="text-2xl font-bold mb-4">🚀 Siap Memulai Pembelajaran Digital?</h3>
                                <p className="text-blue-100 mb-6">
                                    Bergabunglah dengan platform pembelajaran modern yang mengintegrasikan semua kebutuhan pendidikan
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={route('login')}
                                        className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                                    >
                                        🔑 Masuk ke Platform
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={route('register')}
                                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors"
                                        >
                                            ✨ Daftar Gratis
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}