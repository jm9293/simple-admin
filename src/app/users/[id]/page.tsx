import { ApiError } from '@/api/server/api-client';
import { getUserDetail } from '@/api/server/users';
import { Button } from '@/components/ui/Button';
import UserInfo from '@/components/users/UserInfo';
import { notFound } from 'next/navigation';

interface UserDetailPageProps {
  params: {
    id: string;
  };
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await Promise.resolve(params);

  try {
    // 사용자 상세 정보 조회
    const { data: user } = await getUserDetail(id);

    if (!user) {
      notFound();
    }

    return (
      <div className="container mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">사용자 정보 상세보기</h1>
          <Button variant="secondary" href="/users">
            목록으로 돌아가기
          </Button>
        </div>

        <UserInfo user={user} />
        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="primary" href={`/users/${id}/edit`}>
            사용자 정보 수정 및 삭제
          </Button>
        </div>
      </div>
    );
  } catch (error: unknown) {
    // 404 에러인 경우 notFound 페이지 표시
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }
}
