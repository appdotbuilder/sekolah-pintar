import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Head, Link } from '@inertiajs/react';

interface Teacher {
    id: number;
    name: string;
}

interface Subject {
    id: number;
    name: string;
    description: string | null;
    code: string;
    is_active: boolean;
    teacher: Teacher;
    students_count?: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Subjects {
    data: Subject[];
    links: PaginationLink[];
}

interface Props {
    subjects: Subjects;
    canCreate: boolean;
    [key: string]: unknown;
}

export default function SubjectsIndex({ subjects, canCreate }: Props) {
    return (
        <AppShell>
            <Head title="Mata Pelajaran" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                            📚 Mata Pelajaran
                        </h1>
                        <p className="text-gray-600 mt-1">Kelola mata pelajaran dan materi pembelajaran</p>
                    </div>
                    
                    {canCreate && (
                        <Button asChild>
                            <Link href={route('subjects.create')}>
                                ➕ Tambah Mata Pelajaran
                            </Link>
                        </Button>
                    )}
                </div>

                {/* Subjects Grid */}
                {subjects.data.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {subjects.data.map((subject) => (
                            <Card key={subject.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="text-lg">{subject.name}</CardTitle>
                                            <CardDescription>
                                                <span className="font-medium">Kode:</span> {subject.code}
                                            </CardDescription>
                                        </div>
                                        <Badge variant={subject.is_active ? "default" : "secondary"}>
                                            {subject.is_active ? '✅ Aktif' : '⏸️ Nonaktif'}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {subject.description && (
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {subject.description}
                                            </p>
                                        )}
                                        
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span className="text-base">👨‍🏫</span>
                                            <span>Guru: {subject.teacher.name}</span>
                                        </div>
                                        
                                        {subject.students_count !== undefined && (
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <span className="text-base">👨‍🎓</span>
                                                <span>{subject.students_count} murid terdaftar</span>
                                            </div>
                                        )}
                                        
                                        <div className="flex gap-2 pt-2">
                                            <Button size="sm" variant="outline" asChild className="flex-1">
                                                <Link href={route('subjects.show', subject.id)}>
                                                    👁️ Lihat
                                                </Link>
                                            </Button>
                                            {canCreate && (
                                                <Button size="sm" variant="outline" asChild>
                                                    <Link href={route('subjects.edit', subject.id)}>
                                                        ✏️ Edit
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-xl font-semibold mb-2">Belum ada mata pelajaran</h3>
                            <p className="text-gray-600 mb-4 text-center">
                                Mata pelajaran akan ditampilkan di sini setelah dibuat
                            </p>
                            {canCreate && (
                                <Button asChild>
                                    <Link href={route('subjects.create')}>
                                        ➕ Tambah Mata Pelajaran Pertama
                                    </Link>
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {subjects.links && subjects.links.length > 3 && (
                    <div className="flex justify-center">
                        <nav className="flex items-center gap-2">
                            {subjects.links.map((link, index) => (
                                <div key={index}>
                                    {link.url ? (
                                        <Link
                                            href={link.url}
                                            className={`px-3 py-2 text-sm rounded-md ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-50 border'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            className="px-3 py-2 text-sm text-gray-400"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </AppShell>
    );
}