import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';

interface Stats {
    [key: string]: number;
}

interface RecentActivities {
    recent_subjects?: Array<{
        id: number;
        name: string;
        teacher?: { name: string };
    }>;
    my_subjects?: Array<{
        id: number;
        name: string;
        students?: Array<{ id: number }>;
    }>;
    enrolled_subjects?: Array<{
        id: number;
        name: string;
        teacher?: { name: string };
    }>;
    recent_exams?: Array<{
        id: number;
        title: string;
        subject?: { name: string };
    }>;
    recent_results?: Array<{
        id: number;
        percentage: number;
        exam?: {
            title: string;
            subject?: { name: string };
        };
    }>;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'teacher' | 'student';
}

interface Props {
    stats: Stats;
    recentActivities: RecentActivities;
    user: User;
    [key: string]: unknown;
}

export default function Dashboard({ stats, recentActivities, user }: Props) {
    const getRoleEmoji = (role: string) => {
        switch (role) {
            case 'admin': return '👨‍💼';
            case 'teacher': return '👨‍🏫';
            case 'student': return '👨‍🎓';
            default: return '👤';
        }
    };

    const getRoleTitle = (role: string) => {
        switch (role) {
            case 'admin': return 'Administrator';
            case 'teacher': return 'Guru';
            case 'student': return 'Murid';
            default: return 'Pengguna';
        }
    };

    const renderAdminStats = () => (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Murid</CardTitle>
                    <span className="text-2xl">👨‍🎓</span>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{stats.total_students}</div>
                    <p className="text-xs text-muted-foreground">Murid aktif</p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Guru</CardTitle>
                    <span className="text-2xl">👨‍🏫</span>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-600">{stats.total_teachers}</div>
                    <p className="text-xs text-muted-foreground">Guru aktif</p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Mata Pelajaran</CardTitle>
                    <span className="text-2xl">📚</span>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-purple-600">{stats.total_subjects}</div>
                    <p className="text-xs text-muted-foreground">Mata pelajaran aktif</p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Ujian</CardTitle>
                    <span className="text-2xl">📝</span>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-600">{stats.total_exams}</div>
                    <p className="text-xs text-muted-foreground">Ujian tersedia</p>
                </CardContent>
            </Card>
        </div>
    );

    const renderTeacherStats = () => (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Mata Pelajaran Saya</CardTitle>
                    <span className="text-2xl">📚</span>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{stats.my_subjects}</div>
                    <p className="text-xs text-muted-foreground">Yang saya ajar</p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Murid</CardTitle>
                    <span className="text-2xl">👨‍🎓</span>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-600">{stats.total_students}</div>
                    <p className="text-xs text-muted-foreground">Murid terdaftar</p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ujian Saya</CardTitle>
                    <span className="text-2xl">📝</span>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-purple-600">{stats.my_exams}</div>
                    <p className="text-xs text-muted-foreground">Ujian dibuat</p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Hasil Pending</CardTitle>
                    <span className="text-2xl">⏳</span>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-orange-600">{stats.pending_results}</div>
                    <p className="text-xs text-muted-foreground">Menunggu selesai</p>
                </CardContent>
            </Card>
        </div>
    );

    const renderStudentStats = () => (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Mata Pelajaran</CardTitle>
                    <span className="text-2xl">📚</span>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{stats.enrolled_subjects}</div>
                    <p className="text-xs text-muted-foreground">Yang diikuti</p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ujian Tersedia</CardTitle>
                    <span className="text-2xl">📝</span>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-600">{stats.available_exams}</div>
                    <p className="text-xs text-muted-foreground">Bisa dikerjakan</p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ujian Selesai</CardTitle>
                    <span className="text-2xl">✅</span>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-purple-600">{stats.completed_exams}</div>
                    <p className="text-xs text-muted-foreground">Sudah dikerjakan</p>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
                    <span className="text-2xl">🎯</span>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-600">{Math.round(stats.average_score)}%</div>
                    <p className="text-xs text-muted-foreground">Performa keseluruhan</p>
                </CardContent>
            </Card>
        </div>
    );

    return (
        <AppShell>
            <Head title={`Dashboard ${getRoleTitle(user.role)}`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            {getRoleEmoji(user.role)} Dashboard {getRoleTitle(user.role)}
                        </h1>
                        <p className="text-gray-600 mt-1">Selamat datang, {user.name}! 👋</p>
                    </div>
                    
                    <div className="flex gap-2">
                        {(user.role === 'admin' || user.role === 'teacher') && (
                            <>
                                <Button asChild>
                                    <Link href={route('subjects.index')}>
                                        📚 Mata Pelajaran
                                    </Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href={route('exams.index')}>
                                        📝 Ujian
                                    </Link>
                                </Button>
                            </>
                        )}
                        
                        {user.role === 'student' && (
                            <>
                                <Button asChild>
                                    <Link href={route('subjects.index')}>
                                        📚 Pelajaran Saya
                                    </Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href={route('exams.index')}>
                                        📝 Ujian Tersedia
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Stats */}
                {user.role === 'admin' && renderAdminStats()}
                {user.role === 'teacher' && renderTeacherStats()}
                {user.role === 'student' && renderStudentStats()}

                {/* Recent Activities */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {user.role === 'admin' && recentActivities.recent_subjects && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    📚 Mata Pelajaran Terbaru
                                </CardTitle>
                                <CardDescription>
                                    Mata pelajaran yang baru ditambahkan
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {recentActivities.recent_subjects?.map((subject) => (
                                        <div key={subject.id} className="flex justify-between items-center p-2 rounded border">
                                            <div>
                                                <p className="font-medium">{subject.name}</p>
                                                <p className="text-sm text-gray-500">Guru: {subject.teacher?.name}</p>
                                            </div>
                                            <Button size="sm" variant="outline" asChild>
                                                <Link href={route('subjects.show', subject.id)}>
                                                    Lihat
                                                </Link>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {user.role === 'teacher' && recentActivities.my_subjects && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    📚 Mata Pelajaran Saya
                                </CardTitle>
                                <CardDescription>
                                    Mata pelajaran yang saya ajar
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {recentActivities.my_subjects?.map((subject) => (
                                        <div key={subject.id} className="flex justify-between items-center p-2 rounded border">
                                            <div>
                                                <p className="font-medium">{subject.name}</p>
                                                <p className="text-sm text-gray-500">{subject.students?.length || 0} murid</p>
                                            </div>
                                            <Button size="sm" variant="outline" asChild>
                                                <Link href={route('subjects.show', subject.id)}>
                                                    Kelola
                                                </Link>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {user.role === 'student' && recentActivities.enrolled_subjects && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    📚 Mata Pelajaran Saya
                                </CardTitle>
                                <CardDescription>
                                    Mata pelajaran yang diikuti
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {recentActivities.enrolled_subjects?.map((subject) => (
                                        <div key={subject.id} className="flex justify-between items-center p-2 rounded border">
                                            <div>
                                                <p className="font-medium">{subject.name}</p>
                                                <p className="text-sm text-gray-500">Guru: {subject.teacher?.name}</p>
                                            </div>
                                            <Button size="sm" variant="outline" asChild>
                                                <Link href={route('subjects.show', subject.id)}>
                                                    Buka
                                                </Link>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Recent Exams/Results */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                {user.role === 'student' ? '📊 Hasil Ujian Terbaru' : '📝 Ujian Terbaru'}
                            </CardTitle>
                            <CardDescription>
                                {user.role === 'student' 
                                    ? 'Hasil ujian yang baru selesai' 
                                    : 'Ujian yang baru dibuat'
                                }
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {user.role === 'student' && recentActivities.recent_results?.map((result) => (
                                    <div key={result.id} className="flex justify-between items-center p-2 rounded border">
                                        <div>
                                            <p className="font-medium">{result.exam?.title}</p>
                                            <p className="text-sm text-gray-500">
                                                {result.exam?.subject?.name} - Nilai: {Math.round(result.percentage)}%
                                            </p>
                                        </div>
                                        <div className={`px-2 py-1 rounded text-sm font-medium ${
                                            result.percentage >= 75 ? 'bg-green-100 text-green-700' :
                                            result.percentage >= 60 ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                            {result.percentage >= 75 ? '✅ Baik' :
                                             result.percentage >= 60 ? '⚠️ Cukup' : '❌ Kurang'}
                                        </div>
                                    </div>
                                ))}
                                
                                {(user.role === 'admin' || user.role === 'teacher') && recentActivities.recent_exams?.map((exam) => (
                                    <div key={exam.id} className="flex justify-between items-center p-2 rounded border">
                                        <div>
                                            <p className="font-medium">{exam.title}</p>
                                            <p className="text-sm text-gray-500">{exam.subject?.name}</p>
                                        </div>
                                        <Button size="sm" variant="outline" asChild>
                                            <Link href={route('exams.show', exam.id)}>
                                                Lihat
                                            </Link>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}