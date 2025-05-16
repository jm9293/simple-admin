import { deleteUser, getUserDetail, updateUser } from '@/api/server/users';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET 요청 처리 - 사용자 상세 정보 조회
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // 사용자 상세 정보 조회 API 호출
    const data = await getUserDetail(id);

    return NextResponse.json(data);
  } catch (error) {
    console.error('사용자 상세 정보 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '사용자 정보를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * POST 요청 처리 - 사용자 정보 수정
 */
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();

    // 사용자 정보 수정 API 호출
    const data = await updateUser(id, body);

    return NextResponse.json(data);
  } catch (error) {
    console.error('사용자 정보 수정 중 오류 발생:', error);
    return NextResponse.json(
      { error: '사용자 정보를 수정하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE 요청 처리 - 사용자 삭제
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // 사용자 삭제 API 호출
    const data = await deleteUser(id);

    return NextResponse.json(data);
  } catch (error) {
    console.error('사용자 삭제 중 오류 발생:', error);
    return NextResponse.json(
      { error: '사용자를 삭제하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
