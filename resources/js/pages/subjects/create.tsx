import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Teacher {
    id: number;
    name: string;
}

interface Props {
    teachers: Teacher[];
    [key: string]: unknown;
}

interface SubjectFormData {
    name: string;
    description: string;
    code: string;
    teacher_id: string;
    is_active: boolean;
    [key: string]: string | boolean;
}

export default function CreateSubject({ teachers }: Props) {
    const { data, setData, post, processing, errors } = useForm<SubjectFormData>({
        name: '',
        description: '',
        code: '',
        teacher_id: '',
        is_active: true,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('subjects.store'));
    };

    return (
        <AppShell>
            <Head title="Tambah Mata Pelajaran" />
            
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        ➕ Tambah Mata Pelajaran
                    </h1>
                    <p className="text-gray-600 mt-1">Buat mata pelajaran baru untuk sistem pembelajaran</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>📚 Informasi Mata Pelajaran</CardTitle>
                        <CardDescription>
                            Isi informasi lengkap untuk mata pelajaran baru
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Mata Pelajaran *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Contoh: Matematika Kelas X"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            {/* Code */}
                            <div className="space-y-2">
                                <Label htmlFor="code">Kode Mata Pelajaran *</Label>
                                <Input
                                    id="code"
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value)}
                                    placeholder="Contoh: MTK-X-01"
                                    required
                                />
                                {errors.code && (
                                    <p className="text-sm text-red-600">{errors.code}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Deskripsi singkat tentang mata pelajaran ini..."
                                    rows={4}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            {/* Teacher */}
                            <div className="space-y-2">
                                <Label htmlFor="teacher_id">Guru Pengampu *</Label>
                                <Select value={data.teacher_id} onValueChange={(value: string) => setData('teacher_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih guru pengampu" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teachers.map((teacher) => (
                                            <SelectItem key={teacher.id} value={teacher.id.toString()}>
                                                👨‍🏫 {teacher.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.teacher_id && (
                                    <p className="text-sm text-red-600">{errors.teacher_id}</p>
                                )}
                            </div>

                            {/* Active Status */}
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked: boolean) => setData('is_active', checked)}
                                />
                                <Label htmlFor="is_active">Aktif</Label>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <Button type="submit" disabled={processing} className="flex-1">
                                    {processing ? '⏳ Menyimpan...' : '💾 Simpan Mata Pelajaran'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href={route('subjects.index')}>
                                        ❌ Batal
                                    </Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}