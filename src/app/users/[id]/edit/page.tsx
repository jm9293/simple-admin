'use client';

import { deleteProxyUser, getProxyUserDetail, updateProxyUser } from '@/api/client/users';
import { ApiError } from '@/api/server/api-client';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TextField } from '@/components/ui/Input/TextField';
import { AlertDialog, ConfirmDialog } from '@/components/ui/Modal';
import { Tag } from '@/components/ui/Tag';
import { useModal } from '@/hooks/useModal';
import { UserDetail, UserUpdateParams } from '@/types/user';
import { notFound, useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

// 유효성 검사 상태를 위한 인터페이스
interface ValidationErrors {
  name?: string;
  job_rank?: string;
  position?: string;
  email?: string;
  ip_address?: string;
  join_date?: string;
}

export default function UserEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    isConfirmOpen,
    isAlertOpen,
    confirmOptions,
    alertOptions,
    confirm,
    alert,
    handleConfirm,
    handleCancel,
    handleAlertConfirm,
  } = useModal();

  const [user, setUser] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserUpdateParams | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // 변경사항이 있는지 확인
  const hasChanges = useMemo(() => {
    if (!user || !formData) return false;

    // 날짜 형식 통일 (YYYY-MM-DD)
    const userJoinDate = user.join_date.split('T')[0];
    const formJoinDate = formData.join_date.split('T')[0];

    // 각 필드 비교
    return (
      user.name !== formData.name ||
      user.job_rank !== formData.job_rank ||
      user.position !== formData.position ||
      user.email !== formData.email ||
      user.ip_address !== formData.ip_address ||
      user.active !== formData.active ||
      userJoinDate !== formJoinDate
    );
  }, [user, formData]);

  const saveDisabled = useMemo(() => {
    return isLoading || !hasChanges || Object.values(validationErrors).filter(Boolean).length != 0;
  }, [isLoading, hasChanges, validationErrors]);

  // 사용자 데이터 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getProxyUserDetail(id);
        setUser(data);
        setFormData({
          name: data.name,
          job_rank: data.job_rank,
          position: data.position,
          email: data.email,
          ip_address: data.ip_address,
          active: data.active,
          join_date: data.join_date,
        });
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          notFound();
        }
        setError(
          err instanceof Error ? err.message : '사용자 정보를 불러오는 중 오류가 발생했습니다.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // 입력값 유효성 검사 함수
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? '이름을 입력해주세요.' : undefined;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? '유효한 이메일 형식이 아닙니다.' : undefined;
      case 'ip_address':
        const ipRegex =
          /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return !ipRegex.test(value) ? '유효한 IP 주소 형식이 아닙니다.' : undefined;
      case 'job_rank':
        return value.trim() === '' ? '직급을 입력해주세요.' : undefined;
      case 'position':
        return value.trim() === '' ? '부서를 입력해주세요.' : undefined;
      case 'join_date':
        return value.trim() === '' ? '가입일을 입력해주세요.' : undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!formData) return;

    const { name, value, type } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: newValue,
      };
    });

    // 체크박스가 아닌 경우에만 유효성 검사 실행
    if (type !== 'checkbox') {
      const error = validateField(name, value);
      setValidationErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  // 폼 전체 유효성 검사
  const validateForm = (): boolean => {
    if (!formData) return false;

    const errors: ValidationErrors = {};
    let isValid = true;

    // 각 필드 유효성 검사
    (Object.keys(formData) as Array<keyof UserUpdateParams>).forEach((key) => {
      if (key !== 'active') {
        const value = formData[key]?.toString() || '';
        const error = validateField(key, value);
        if (error) {
          errors[key] = error;
          isValid = false;
        }
      }
    });

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    // 폼 유효성 검사
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await updateProxyUser(id, formData);

      // 알림 모달 표시 및 완료 대기
      await alert({
        title: '저장 완료',
        message: '사용자 정보가 성공적으로 저장되었습니다.',
        confirmText: '확인',
        variant: 'success',
      });

      // 모달이 닫히면 목록 페이지로 이동
      router.push(`/users/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '사용자 정보 업데이트 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    // 사용자에게 삭제 확인 요청
    const shouldDelete = await confirm({
      title: '사용자 삭제 확인',
      message: `'${user?.name}' 사용자를 정말로 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.`,
      confirmText: '삭제',
      cancelText: '취소',
      variant: 'error',
    });

    // 취소 선택 시 종료
    if (!shouldDelete) return;

    setIsDeleting(true);
    setError(null);

    try {
      await deleteProxyUser(id);

      // 알림 모달 표시 및 완료 대기
      await alert({
        title: '삭제 완료',
        message: '사용자가 성공적으로 삭제되었습니다.',
        confirmText: '확인',
        variant: 'success',
      });

      // 모달이 닫히면 목록 페이지로 이동
      router.push('/users');
    } catch (err) {
      setError(err instanceof Error ? err.message : '사용자 삭제 중 오류가 발생했습니다.');
      setIsDeleting(false);
    }
  };

  // 에러 화면
  if (error && !formData) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">사용자 편집</h1>
          <Button variant="secondary" href={`/users/${id}`}>
            돌아가기
          </Button>
        </div>
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">오류가 발생했습니다</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error || '사용자 정보를 불러오는데 실패했습니다.'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 편집 화면
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">사용자 편집</h1>
        <Button variant="secondary" href={`/users/${id}`}>
          사용자 정보로 돌아가기
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Card title="사용자 정보 편집">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4 text-red-700">
              <p>{error}</p>
            </div>
          )}

          <div className="divide-y divide-gray-200">
            <div className="flex py-4">
              <span className="w-1/3 font-medium text-gray-600">ID</span>
              <div className="w-2/3">
                {isLoading ? (
                  <div className="h-9 w-full animate-pulse rounded bg-gray-200"></div>
                ) : (
                  <span className="text-gray-900">{user?.id}</span>
                )}
              </div>
            </div>

            <div className="flex py-4">
              <span className="w-1/3 font-medium text-gray-600">일련번호</span>
              <div className="w-2/3">
                {isLoading ? (
                  <div className="h-9 w-full animate-pulse rounded bg-gray-200"></div>
                ) : (
                  <span className="text-gray-900">{user?.seq_no}</span>
                )}
              </div>
            </div>

            <div className="flex items-center py-4">
              <span className="w-1/3 font-medium text-gray-600">이름</span>
              <div className="w-2/3">
                <TextField
                  name="name"
                  value={formData?.name || ''}
                  onChange={handleChange}
                  isLoading={isLoading}
                  required
                  className="w-full"
                  status={validationErrors.name ? 'error' : 'default'}
                  error={validationErrors.name}
                />
              </div>
            </div>

            <div className="flex items-center py-4">
              <span className="w-1/3 font-medium text-gray-600">직급</span>
              <div className="w-2/3">
                <TextField
                  name="job_rank"
                  value={formData?.job_rank || ''}
                  onChange={handleChange}
                  isLoading={isLoading}
                  required
                  className="w-full"
                  status={validationErrors.job_rank ? 'error' : 'default'}
                  error={validationErrors.job_rank}
                />
              </div>
            </div>

            <div className="flex items-center py-4">
              <span className="w-1/3 font-medium text-gray-600">부서</span>
              <div className="w-2/3">
                <TextField
                  name="position"
                  value={formData?.position || ''}
                  onChange={handleChange}
                  isLoading={isLoading}
                  required
                  className="w-full"
                  status={validationErrors.position ? 'error' : 'default'}
                  error={validationErrors.position}
                />
              </div>
            </div>

            <div className="flex items-center py-4">
              <span className="w-1/3 font-medium text-gray-600">이메일</span>
              <div className="w-2/3">
                <TextField
                  type="email"
                  name="email"
                  value={formData?.email || ''}
                  onChange={handleChange}
                  isLoading={isLoading}
                  required
                  className="w-full"
                  status={validationErrors.email ? 'error' : 'default'}
                  error={validationErrors.email}
                />
              </div>
            </div>

            <div className="flex items-center py-4">
              <span className="w-1/3 font-medium text-gray-600">IP 주소</span>
              <div className="w-2/3">
                <TextField
                  name="ip_address"
                  value={formData?.ip_address || ''}
                  onChange={handleChange}
                  isLoading={isLoading}
                  required
                  className="w-full"
                  status={validationErrors.ip_address ? 'error' : 'default'}
                  error={validationErrors.ip_address}
                />
              </div>
            </div>

            <div className="flex items-center py-4">
              <span className="w-1/3 font-medium text-gray-600">가입일</span>
              <div className="w-2/3">
                <TextField
                  type="date"
                  name="join_date"
                  value={formData?.join_date?.split('T')[0] || ''}
                  onChange={handleChange}
                  isLoading={isLoading}
                  required
                  className="w-full"
                  status={validationErrors.join_date ? 'error' : 'default'}
                  error={validationErrors.join_date}
                />
              </div>
            </div>

            <div className="flex items-center py-4">
              <span className="w-1/3 font-medium text-gray-600">상태</span>
              <div className="flex w-2/3 items-center">
                {isLoading ? (
                  <div className="h-9 w-full animate-pulse rounded bg-gray-200"></div>
                ) : (
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      name="active"
                      className="peer sr-only"
                      checked={formData?.active || false}
                      onChange={handleChange}
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-green-600 peer-focus:ring-4 peer-focus:ring-green-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      <Tag variant={formData?.active ? 'success' : 'danger'}>
                        {formData?.active ? '활성' : '비활성'}
                      </Tag>
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-6 flex justify-between">
          <Button
            type="button"
            variant="error"
            onClick={handleDelete}
            isLoading={isDeleting}
            isDisabled={isLoading}
          >
            사용자 삭제
          </Button>
          <div className="flex items-center gap-3">
            {!isLoading && !hasChanges && (
              <span className="text-sm text-gray-500">변경사항 없음</span>
            )}
            <Button type="submit" variant="primary" isLoading={isSaving} isDisabled={saveDisabled}>
              저장
            </Button>
          </div>
        </div>
      </form>

      {/* 확인 모달 */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        title={confirmOptions.title}
        message={confirmOptions.message}
        confirmText={confirmOptions.confirmText}
        cancelText={confirmOptions.cancelText}
      />

      {/* 알림 모달 */}
      <AlertDialog
        isOpen={isAlertOpen}
        onClose={handleAlertConfirm}
        title={alertOptions.title}
        message={alertOptions.message}
        confirmText={alertOptions.confirmText}
      />
    </div>
  );
}
