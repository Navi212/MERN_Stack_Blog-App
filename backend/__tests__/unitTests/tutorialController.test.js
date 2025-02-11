/* eslint-disable no-undef */
const { Tutorial, TutorialTopic } = require('../../models/tutorialModel');
const { AppError } = require('../../services/errorHandler');
const { paginationHelper } = require('../../services/paginationHelper');
const {
  getAllTutorials,
  getTutorial,
  getTutorialTopics,
  getTutorialTopic,
  getTutorialSubTopics,
  getTutorialSubTopic,
  createTutorial,
  createTutorialTopic,
  createTutorialSubTopic,
  updateTutorial,
  updateTutorialTopic,
  updateTutorialSubTopic,
  deleteTutorial,
  deleteTutorialTopic,
  deleteTutorialSubTopic,
} = require('../../controllers/tutorialController');

// Mock paginationHelper module
jest.mock('../../services/paginationHelper');

// Mock req
const mockRequest = () => ({
  query: {
    page: 2,
    limit: 2,
  },
  params: {
    tutorialId: '67a55ab5dbb9ddb368ff75a7',
    topicId: '67a55c18dbb9ddb368ff75ae',
    subtopicId: '67a561e52c798069a3a67aa7',
  },
  body: {
    name: 'MongoDB',
    description: 'Intro',
    content:
      'Setting up clusters requires some intermediate knowledge of MongoDB',
  },
});

// Mock res
const mockResponse = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
});

// Restore all mocks after each test
afterEach(() => {
  jest.restoreAllMocks();
});

describe('Tutorial', () => {
  const mockData = {
    _id: '67a673f80d036894493f387d',
    name: 'C++',
    description: 'Introduction to C++',
    createdAt: '2025-02-07T20:58:32.958Z',
    updatedAt: '2025-02-07T20:58:32.958Z',
  };

  const mockTutorial = {
    _id: '67a94cf4c0a1ddbac6e243c4',
    name: 'MongoDB',
    description: 'Intro',
    createdAt: '2025-02-10T00:48:52.022Z',
    updatedAt: '2025-02-10T00:48:52.022Z',
  };

  const mockTutorialTopic = {
    _id: '67a561e52c798069a3a67aa7',
    name: 'Z-Ubuntu',
    description: 'More on Z-Ubuntu',
    tutorialTopicId: '67a55c18dbb9ddb368ff75ae',
    tutorialId: '67a55ab5dbb9ddb368ff75a7',
    createdAt: '2025-02-07T01:29:09.677Z',
    updatedAt: '2025-02-07T01:29:09.677Z',
  };

  const mockTopics = [
    {
      _id: '67a55b72dbb9ddb368ff75aa',
      name: 'Installation',
      description: 'Installation on various OS',
      tutorialId: '67a55ab5dbb9ddb368ff75a7',
      createdAt: '2025-02-07T01:01:38.799Z',
      updatedAt: '2025-02-07T01:01:38.799Z',
    },
    {
      _id: '67a55c35dbb9ddb368ff75b6',
      name: 'Installation on RedHat',
      description: 'Installation on RedHat OS',
      tutorialId: '67a55ab5dbb9ddb368ff75a7',
      createdAt: '2025-02-07T01:04:53.436Z',
      updatedAt: '2025-02-07T01:04:53.436Z',
    },
  ];

  const mockSubtopics = [
    {
      _id: '67a561e52c798069a3a67aa7',
      name: 'Z-Ubuntu',
      description: 'More on Z-Ubuntu',
      tutorialTopicId: '67a55c18dbb9ddb368ff75ae',
      tutorialId: '67a55ab5dbb9ddb368ff75a7',
      createdAt: '2025-02-07T01:29:09.677Z',
      updatedAt: '2025-02-07T01:29:09.677Z',
    },
    {
      _id: '67a562032c798069a3a67aab',
      name: 'J-Ubuntu',
      description: 'More on J-Ubuntu',
      tutorialTopicId: '67a55c18dbb9ddb368ff75ae',
      tutorialId: '67a55ab5dbb9ddb368ff75a7',
      createdAt: '2025-02-07T01:29:39.595Z',
      updatedAt: '2025-02-07T01:29:39.595Z',
    },
  ];

  const mockSubtopic = {
    _id: '67a561e52c798069a3a67aa7',
    name: 'Z-Ubuntu',
    description: 'More on Z-Ubuntu',
    tutorialTopicId: '67a55c18dbb9ddb368ff75ae',
    tutorialId: '67a55ab5dbb9ddb368ff75a7',
    createdAt: '2025-02-07T01:29:09.677Z',
    updatedAt: '2025-02-07T01:29:09.677Z',
  };

  describe('getAllTutorials', () => {
    test('Should get all tutorials', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      paginationHelper.mockReturnValueOnce(mockReq.query);
      jest.spyOn(Tutorial, 'find').mockImplementationOnce(() => ({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockResolvedValueOnce([mockData]),
      }));
      await getAllTutorials(mockReq, mockRes, next);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        content: [mockData],
      });
    });

    test('Should throw an error if no tutorials', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      paginationHelper.mockReturnValueOnce(mockReq.query);
      jest.spyOn(Tutorial, 'find').mockImplementationOnce(() => ({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockResolvedValueOnce(null),
      }));
      await getAllTutorials(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('No tutorial found');
    });
  });

  describe('getTutorial', () => {
    test('Should get a single tutorial', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findById').mockResolvedValueOnce(mockData);

      await getTutorial(mockReq, mockRes, next);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        content: mockData,
      });
    });

    test('Should throw an error when no tutorial is found', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findById').mockResolvedValueOnce(null);

      await getTutorial(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('No tutorial found');
    });

    test('Should throw an error on invalid tutorial Id', async () => {
      const mockReq = mockRequest();
      mockReq.params = {};
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findById').mockResolvedValueOnce(mockReq.params);

      await getTutorial(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid tutorialId');
    });
  });

  describe('getTutorialTopics', () => {
    test('Should throw an error on invalid tutorial Id', async () => {
      const mockReq = mockRequest();
      mockReq.params = {};
      const mockRes = mockResponse();
      const next = jest.fn();

      paginationHelper.mockReturnValueOnce(mockReq.query);

      await getTutorialTopics(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid/No tutorialId');
    });

    test('Should get the topics for a single tutorial', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      paginationHelper.mockReturnValueOnce(mockReq.query);
      jest.spyOn(TutorialTopic, 'find').mockImplementationOnce(() => ({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockResolvedValueOnce(mockTopics),
      }));

      await getTutorialTopics(mockReq, mockRes, next);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        content: mockTopics,
      });
    });

    test('Should throw an error when no topics found', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      paginationHelper.mockReturnValueOnce(mockReq.query);
      jest.spyOn(TutorialTopic, 'find').mockImplementationOnce(() => ({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockResolvedValueOnce(null),
      }));

      await getTutorialTopics(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('No topics found');
    });
  });

  describe('getTutorialTopic', () => {
    test('Should throw an error on invalid tutorialId or topicId', async () => {
      const mockReq = mockRequest();
      delete mockReq.params.topicId;
      const mockRes = mockResponse();
      const next = jest.fn();

      await getTutorialTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid/No tutorialId or topicId');
    });

    test('Should get a single topic for a tutorial', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest
        .spyOn(TutorialTopic, 'findOne')
        .mockResolvedValueOnce(mockTutorialTopic);

      await getTutorialTopic(mockReq, mockRes, next);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        content: mockTutorialTopic,
      });
    });

    test('Should throw an error if no topic found', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(TutorialTopic, 'findOne').mockResolvedValueOnce(null);

      await getTutorialTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('No topic found');
    });
  });

  describe('getTutorialSubTopics', () => {
    test('Should throw an error on invalid tutorialId or topicId', async () => {
      const mockReq = mockRequest();
      mockReq.params = {};
      const mockRes = mockResponse();
      const next = jest.fn();

      paginationHelper.mockReturnValueOnce(mockReq.query);
      await getTutorialSubTopics(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid tutorialId or topicId');
    });

    test('Should get all subtopics of a topic', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      paginationHelper.mockReturnValueOnce(mockReq.query);
      jest.spyOn(TutorialTopic, 'find').mockImplementationOnce(() => ({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockResolvedValueOnce(mockSubtopics),
      }));
      await getTutorialSubTopics(mockReq, mockRes, next);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        content: mockSubtopics,
      });
    });

    test('Should throw an error if no subtopics', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      paginationHelper.mockReturnValueOnce(mockReq.query);
      jest.spyOn(TutorialTopic, 'find').mockImplementationOnce(() => ({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockResolvedValueOnce(null),
      }));
      await getTutorialSubTopics(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('No subtopics found');
    });
  });

  describe('getTutorialSubTopic', () => {
    test('Should throw an error on invalid tutorialId/topicId/subtopicId', async () => {
      const mockReq = mockRequest();
      mockReq.params = {};
      const mockRes = mockResponse();
      const next = jest.fn();

      await getTutorialSubTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid/No tutorialId/topicId/subtopicId');
    });

    test('Should get a single subtopic of a tutorial topic', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(TutorialTopic, 'findOne').mockResolvedValueOnce(mockSubtopic);

      await getTutorialSubTopic(mockReq, mockRes, next);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        content: mockSubtopic,
      });
    });

    test('Should throw an error if not subtopic of a tutorial topic', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(TutorialTopic, 'findOne').mockResolvedValueOnce(null);

      await getTutorialSubTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('No subtopic found');
    });
  });

  describe('createTutorial', () => {
    const mockCreatedTutorial = {
      _id: '67a94cf4c0a1ddbac6e243c4',
      name: 'MongoDB',
      description: 'Intro',
      createdAt: '2025-02-10T00:48:52.022Z',
      updatedAt: '2025-02-10T00:48:52.022Z',
    };

    test('Should throw an error if tutorial name/description missing', async () => {
      const mockReq = mockRequest();
      mockReq.body = {};
      const mockRes = mockResponse();
      const next = jest.fn();

      await createTutorial(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Tutorial name or description missing');
    });

    test('Should create a tutorial', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'create').mockResolvedValueOnce(mockCreatedTutorial);

      await createTutorial(mockReq, mockRes, next);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Tutorial created',
      });
    });

    test('Should throw error if could not create tutorial', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'create').mockResolvedValueOnce(null);

      await createTutorial(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Error occured creating tutorial');
    });
  });

  describe('createTutorialTopic', () => {
    const mockCreatedTopic = {
      name: 'MongoDB Clusters',
      description: 'How to setup mongodb clusters',
      content:
        'Setting up clusters requires some intermediate knowledge of MongoDB',
    };

    test('Should throw an error if topic name/description/content missing', async () => {
      const mockReq = mockRequest();
      delete mockReq.body.name;
      const mockRes = mockResponse();
      const next = jest.fn();

      await createTutorialTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe(
        'Tutorial topic name/description/content missing'
      );
    });

    test('Should throw an error if tutorial Id doesnt exist in DB', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findById').mockResolvedValueOnce(null);

      await createTutorialTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Tutorial does not exist');
    });

    test('Should throw an error if Error occured creating tutorial topic', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest
        .spyOn(Tutorial, 'findById')
        .mockResolvedValueOnce(mockReq.params.tutorialId);
      jest.spyOn(TutorialTopic, 'create').mockResolvedValueOnce(null);

      await createTutorialTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Error occured creating tutorial topic');
    });

    test('Should create tutorial topic', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest
        .spyOn(Tutorial, 'findById')
        .mockResolvedValueOnce(mockReq.params.tutorialId);
      jest
        .spyOn(TutorialTopic, 'create')
        .mockResolvedValueOnce(mockCreatedTopic);

      await createTutorialTopic(mockReq, mockRes, next);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Tutorial topic created',
      });
    });
  });

  describe('createTutorialSubTopic', () => {
    mockCreateSubtopic = {
      _id: '67a562032c798069a3a67aab',
      name: 'J-Ubuntu',
      description: 'More on J-Ubuntu',
      tutorialTopicId: '67a55c18dbb9ddb368ff75ae',
      tutorialId: '67a55ab5dbb9ddb368ff75a7',
      createdAt: '2025-02-07T01:29:39.595Z',
      updatedAt: '2025-02-07T01:29:39.595Z',
    };

    test('Should throw an error if subtopic name/description/content missing', async () => {
      const mockReq = mockRequest();
      mockReq.body = {};
      const mockRes = mockResponse();
      const next = jest.fn();

      await createTutorialSubTopic(mockReq, mockRes, next);

      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe(
        'Tutorial subtopic name/description/content missing'
      );
    });

    test('Should throw an error if Tutorial or Topic does not exist', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findById').mockResolvedValueOnce(null);
      jest.spyOn(TutorialTopic, 'findById').mockResolvedValueOnce(null);

      await createTutorialSubTopic(mockReq, mockRes, next);

      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Tutorial or Topic does not exist');
    });

    test('Should throw error if could not create subtopic', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest
        .spyOn(Tutorial, 'findById')
        .mockResolvedValueOnce(mockReq.params.tutorialId);
      jest
        .spyOn(TutorialTopic, 'findById')
        .mockResolvedValueOnce(mockReq.params.topicId);
      jest.spyOn(TutorialTopic, 'create').mockResolvedValueOnce(null);

      await createTutorialSubTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Error occured creating tutorial subtopic');
    });

    test('Should create a tutorial subtopic', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest
        .spyOn(Tutorial, 'findById')
        .mockResolvedValueOnce(mockReq.params.tutorialId);
      jest
        .spyOn(TutorialTopic, 'findById')
        .mockResolvedValueOnce(mockReq.params.topicId);
      jest
        .spyOn(TutorialTopic, 'create')
        .mockResolvedValueOnce(mockCreateSubtopic);

      await createTutorialSubTopic(mockReq, mockRes, next);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Tutorial subtopic created',
      });
    });
  });

  describe('updateTutorial', () => {
    const mockUpdatedTutorial = {
      _id: '67a94cf4c0a1ddbac6e243c4',
      name: 'MongoDB',
      description: 'Introduction to MongoDB Cluters',
      createdAt: '2025-02-10T00:48:52.022Z',
      updatedAt: '2025-02-10T00:48:52.022Z',
    };

    test('Should throw error on invalid tutorial Id', async () => {
      const mockReq = mockRequest();
      mockReq.params = {};
      const mockRes = mockResponse();
      const next = jest.fn();

      await updateTutorial(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid/No tutorialId');
    });

    test('Should throw an error on update error', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findByIdAndUpdate').mockResolvedValueOnce(null);

      await updateTutorial(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Error occured updating Tutorial');
    });

    test('Should update a single tutorial', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest
        .spyOn(Tutorial, 'findByIdAndUpdate')
        .mockResolvedValueOnce(mockUpdatedTutorial);

      await updateTutorial(mockReq, mockRes, next);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Tutorial updated',
      });
    });
  });

  describe('updateTutorialTopic', () => {
    const mockUpdatedTopic = {
      _id: '67a94cf4c0a1ddbac6e243c4',
      name: 'MongoDB',
      description: 'Introduction',
      content: 'Introduction to MongoDB Cluters',
      createdAt: '2025-02-10T00:48:52.022Z',
      updatedAt: '2025-02-10T00:48:52.022Z',
    };

    test('Should throw error on Invalid tutorialId/topicId', async () => {
      const mockReq = mockRequest();
      mockReq.params = {};
      const mockRes = mockResponse();
      const next = jest.fn();

      await updateTutorialTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid/No tutorialId/topicId');
    });

    test('Should throw an error if no tutorial found', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findById').mockResolvedValueOnce(null);

      await updateTutorialTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('No tutorial found');
    });

    test('Should throw an error on update error', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findById').mockResolvedValueOnce(mockTutorial);
      jest
        .spyOn(TutorialTopic, 'findByIdAndUpdate')
        .mockResolvedValueOnce(null);

      await updateTutorialTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Error occured updating Topic');
    });

    test('Should update a single tutorial', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findById').mockResolvedValueOnce(mockTutorial);
      jest
        .spyOn(TutorialTopic, 'findByIdAndUpdate')
        .mockResolvedValueOnce(mockUpdatedTopic);

      await updateTutorialTopic(mockReq, mockRes, next);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Topic updated',
      });
    });
  });

  describe('updateTutorialSubTopic', () => {
    const mockUpdatedSubtopic = {
      _id: '67a96e20a2b38e573855ad77',
      name: 'MongoDB Clusters A++',
      description: 'How to setup mongodb clusters A++',
      content:
        'Setting up clusters requires some intermediate knowledge of MongoDB A++',
      tutorialTopicId: '67a9515954ea5d31020e58ef',
      tutorialId: '67a94cf4c0a1ddbac6e243c4',
      createdAt: '2025-02-10T03:10:24.657Z',
      updatedAt: '2025-02-10T03:10:24.657Z',
    };

    test('Should throw error on Invalid tutorialId/topicId/subtopicId', async () => {
      const mockReq = mockRequest();
      mockReq.params = {};
      const mockRes = mockResponse();
      const next = jest.fn();

      await updateTutorialSubTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid tutorialId/topicId/subtopicId');
    });

    test('Should throw an error when tutorial and topic doesnt exist', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findById').mockResolvedValueOnce(null);
      jest.spyOn(TutorialTopic, 'findById').mockResolvedValueOnce(null);

      await updateTutorialSubTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('No tutorial and topic found');
    });

    test('Should throw an error on update error', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findById').mockResolvedValueOnce(mockTutorial);
      jest
        .spyOn(TutorialTopic, 'findById')
        .mockResolvedValueOnce(mockTutorialTopic);
      jest
        .spyOn(TutorialTopic, 'findByIdAndUpdate')
        .mockResolvedValueOnce(null);

      await updateTutorialSubTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Error occured updating SubTopic');
    });

    test('Should update a single subtopic', async () => {
      const mockReq = mockRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findById').mockResolvedValueOnce(mockTutorial);
      jest
        .spyOn(TutorialTopic, 'findById')
        .mockResolvedValueOnce(mockTutorialTopic);
      jest
        .spyOn(TutorialTopic, 'findByIdAndUpdate')
        .mockResolvedValueOnce(mockUpdatedSubtopic);

      await updateTutorialSubTopic(mockReq, mockRes, next);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'SubTopic updated',
      });
    });
  });

  describe('deleteTutorial', () => {
    const mockDeleteRequest = () => ({
      params: {
        tutorialId: '67a673f80d036894493f387d',
      },
    });
    test('Should throw an error on invalid tutorial Id', async () => {
      const mockReq = mockDeleteRequest();
      mockReq.params = {};
      const mockRes = mockResponse();
      const next = jest.fn();

      await deleteTutorial(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid tutorialId');
    });

    test('Should throw error on delete error', async () => {
      const mockReq = mockDeleteRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findByIdAndDelete').mockResolvedValueOnce(false);

      await deleteTutorial(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Error occured deleting Tutorial');
    });

    test('Should delete a tutorial successfully', async () => {
      const mockReq = mockDeleteRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findByIdAndDelete').mockResolvedValueOnce(true);

      await deleteTutorial(mockReq, mockRes, next);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Tutorial deleted',
      });
    });
  });

  describe('deleteTutorialTopic', () => {
    const mockDeleteRequest = () => ({
      params: {
        tutorialId: '67a673f80d036894493f387d',
        topicId: '67a55c25dbb9ddb368ff75b2',
      },
    });
    test('Should throw an error on Invalid tutorialId/topicId', async () => {
      const mockReq = mockDeleteRequest();
      mockReq.params = {};
      const mockRes = mockResponse();
      const next = jest.fn();

      await deleteTutorialTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid tutorialId/topicId');
    });

    test('Should throw error when no tutorial found', async () => {
      const mockReq = mockDeleteRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findById').mockResolvedValueOnce(null);

      await deleteTutorialTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('No tutorial found');
    });

    test('Should throw error on delete error', async () => {
      const mockReq = mockDeleteRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findById').mockResolvedValueOnce(mockTutorial);
      jest
        .spyOn(TutorialTopic, 'findByIdAndDelete')
        .mockResolvedValueOnce(false);

      await deleteTutorialTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Error occured deleting Topic');
    });

    test('Should delete a tutorial topic successfully', async () => {
      const mockReq = mockDeleteRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findById').mockResolvedValueOnce(mockTutorial);
      jest
        .spyOn(TutorialTopic, 'findByIdAndDelete')
        .mockResolvedValueOnce(true);

      await deleteTutorialTopic(mockReq, mockRes, next);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Topic deleted',
      });
    });
  });

  describe('deleteTutorialSubTopic', () => {
    const mockDeleteRequest = () => ({
      params: {
        tutorialId: '67a673f80d036894493f387d',
        topicId: '67a55c25dbb9ddb368ff75b2',
        subtopicId: '67a5620b2c798069a3a67aaf',
      },
    });
    test('Should throw an error on invalid tutorialId/topicId/subtopicId', async () => {
      const mockReq = mockDeleteRequest();
      mockReq.params = {};
      const mockRes = mockResponse();
      const next = jest.fn();

      await deleteTutorialSubTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid tutorialId/topicId/subtopicId');
    });

    test('Should throw error when tutorial and topic doesnt exist', async () => {
      const mockReq = mockDeleteRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findById').mockResolvedValueOnce(null);
      jest.spyOn(TutorialTopic, 'findById').mockResolvedValueOnce(null);

      await deleteTutorialSubTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('No tutorial and topic found');
    });

    test('Should throw error on delete error', async () => {
      const mockReq = mockDeleteRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findById').mockResolvedValueOnce(mockTutorial);
      jest
        .spyOn(TutorialTopic, 'findById')
        .mockResolvedValueOnce(mockTutorialTopic);
      jest
        .spyOn(TutorialTopic, 'findByIdAndDelete')
        .mockResolvedValueOnce(false);

      await deleteTutorialSubTopic(mockReq, mockRes, next);
      const [error] = next.mock.calls[0];

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Error occured deleting Topic');
    });

    test('Should delete a tutorial subtopic successfully', async () => {
      const mockReq = mockDeleteRequest();
      const mockRes = mockResponse();
      const next = jest.fn();

      jest.spyOn(Tutorial, 'findById').mockResolvedValueOnce(mockTutorial);
      jest
        .spyOn(TutorialTopic, 'findById')
        .mockResolvedValueOnce(mockTutorialTopic);
      jest
        .spyOn(TutorialTopic, 'findByIdAndDelete')
        .mockResolvedValueOnce(true);

      await deleteTutorialSubTopic(mockReq, mockRes, next);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Subtopic deleted',
      });
    });
  });
});
