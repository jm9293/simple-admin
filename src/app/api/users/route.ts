import { getUserList } from '@/api/server/users';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET 요청 처리 - 사용자 목록 조회
 */
export async function GET(request: NextRequest) {
  try {
    // URL 파라미터 추출
    const searchParams = request.nextUrl.searchParams;

    // 파라미터 객체 구성
    const params = {
      page_index: Number(searchParams.get('page_index') || 1),
      page_size: Number(searchParams.get('page_size') || 10),
      id: searchParams.get('id') || undefined,
      name: searchParams.get('name') || undefined,
      email: searchParams.get('email') || undefined,
      active: searchParams.has('active') ? searchParams.get('active') === 'true' : undefined,
    };

    console.log(params);

    // 사용자 목록 조회 API 호출
    const data = await getUserList(params);

    return NextResponse.json(data);
  } catch (error) {
    console.error('사용자 목록 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '사용자 목록을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
