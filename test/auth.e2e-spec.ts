import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  //should run one time as still not swapped to in-memory DB
  // it('handles a signup request', () => {
  //   const email = 'test@test.com';
  //   return request(app.getHttpServer())
  //     .post('/users/signup')
  //     .send({ email: email, password: 'test' })
  //     .expect(201)
  //     .then((res) => {
  //       const { id, email } = res.body;
  //       expect(id).toBeDefined();
  //       expect(email).toBe(email);
  //     });
  // });

  it('signout as a user', async () => {
    const email = 'test@example.com';
    const res = await request(app.getHttpServer())
      .post('/users/signin')
      .send({ email, password: 'password123' })
      .expect(201);

    const signOutCookieHeader = res.get('Set-Cookie');
    expect(signOutCookieHeader).toBeDefined();

    const clearCookieString = Array.isArray(signOutCookieHeader)
      ? signOutCookieHeader[0]
      : signOutCookieHeader;

    await request(app.getHttpServer())
      .post('/users/signout')
      .set('Cookie', clearCookieString!)
      .send()
      .expect(201);
  });
});
