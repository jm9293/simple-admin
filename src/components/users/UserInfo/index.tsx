import { UserDetail } from '@/types/user';
import { Card } from '../../ui/Card';
import { Tag } from '../../ui/Tag';

interface UserInfoProps {
  /** 사용자 정보 */
  user: UserDetail;
}

export default function UserInfo({ user }: UserInfoProps) {
  return (
    <Card title="사용자 정보">
      <div className="divide-y divide-gray-200">
        <div className="flex py-4">
          <span className="w-1/3 font-medium text-gray-600">ID</span>
          <span className="w-2/3 text-gray-900">{user.id}</span>
        </div>
        <div className="flex py-4">
          <span className="w-1/3 font-medium text-gray-600">일련번호</span>
          <span className="w-2/3 text-gray-900">{user.seq_no}</span>
        </div>
        <div className="flex py-4">
          <span className="w-1/3 font-medium text-gray-600">이름</span>
          <span className="w-2/3 text-gray-900">{user.name}</span>
        </div>
        <div className="flex py-4">
          <span className="w-1/3 font-medium text-gray-600">직급</span>
          <span className="w-2/3 text-gray-900">{user.job_rank}</span>
        </div>
        <div className="flex py-4">
          <span className="w-1/3 font-medium text-gray-600">부서</span>
          <span className="w-2/3 text-gray-900">{user.position}</span>
        </div>
        <div className="flex py-4">
          <span className="w-1/3 font-medium text-gray-600">이메일</span>
          <span className="w-2/3 text-gray-900">{user.email}</span>
        </div>
        <div className="flex py-4">
          <span className="w-1/3 font-medium text-gray-600">IP 주소</span>
          <span className="w-2/3 text-gray-900">{user.ip_address}</span>
        </div>
        <div className="flex py-4">
          <span className="w-1/3 font-medium text-gray-600">가입일</span>
          <span className="w-2/3 text-gray-900">
            {new Date(user.join_date).toLocaleDateString('ko-KR')}
          </span>
        </div>
        <div className="flex py-4">
          <span className="w-1/3 font-medium text-gray-600">상태</span>
          <Tag variant={user.active ? 'success' : 'danger'}>{user.active ? '활성' : '비활성'}</Tag>
        </div>
      </div>
    </Card>
  );
}
