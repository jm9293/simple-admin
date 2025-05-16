import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('./mock/db.json');
const middlewares = jsonServer.defaults();
const port = 3001;

// 미들웨어 설정
server.use(middlewares);
server.use(jsonServer.bodyParser);

// 커스텀 라우트 설정
server.get('/api/users', (req, res) => {
  const { page_index = 1, page_size = 10, id, name, email, active } = req.query;

  // db.json에서 사용자 데이터 가져오기
  const users = router.db.get('users').value();

  // 필터링 로직
  let filteredUsers = users;

  if (id) {
    filteredUsers = filteredUsers.filter((user) => user.id.includes(id));
  }

  if (name) {
    filteredUsers = filteredUsers.filter((user) => user.name.includes(name));
  }

  if (email) {
    filteredUsers = filteredUsers.filter((user) => user.email.includes(email));
  }

  if (active !== undefined) {
    const isActive = active === 'true';
    filteredUsers = filteredUsers.filter((user) => user.active === isActive);
  }

  // 페이지네이션 로직
  const pageIndex = parseInt(page_index);
  const pageSize = parseInt(page_size);
  const startIndex = (pageIndex - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // API 스펙에 맞는 응답 구성
  const response = {
    meta: {
      status: 200,
      message: 'Success',
    },
    data: {
      page_index: pageIndex,
      page_size: pageSize,
      total_count: filteredUsers.length,
      result_list: paginatedUsers,
    },
  };

  res.json(response);
});

// 사용자 상세 조회
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = router.db.get('users').find({ id }).value();

  if (!user) {
    return res.status(404).json({
      meta: {
        status: 404,
        message: 'User not found',
      },
    });
  }

  const response = {
    meta: {
      status: 200,
      message: 'Success',
    },
    data: user,
  };

  res.json(response);
});

// 사용자 정보 수정
server.post('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  const user = router.db.get('users').find({ id }).value();

  if (!user) {
    return res.status(404).json({
      meta: {
        status: 404,
        message: 'User not found',
      },
    });
  }

  // 사용자 정보 업데이트
  router.db.get('users').find({ id }).assign(userData).write();

  res.json({
    meta: {
      status: 200,
      message: 'User updated successfully',
    },
  });
});

// 사용자 정보 삭제
server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = router.db.get('users').find({ id }).value();

  if (!user) {
    return res.status(404).json({
      meta: {
        status: 404,
        message: 'User not found',
      },
    });
  }

  // 사용자 삭제
  router.db.get('users').remove({ id }).write();

  res.json({
    meta: {
      status: 200,
      message: 'User deleted successfully',
    },
  });
});

// 기본 라우트 설정 (위에서 정의하지 않은 라우트는 기본 json-server 라우터가 처리)
server.use('/api', router);

// 서버 시작
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
  console.log(`API 엔드포인트: http://localhost:${port}/api/users`);
});
