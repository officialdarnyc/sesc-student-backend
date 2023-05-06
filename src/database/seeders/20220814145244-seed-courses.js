'use strict';

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('courses',[
        {
          id: 1,
          name: 'Algorithms and Data Structures',
          description: 'This course covers the design and analysis of efficient algorithms and data structures for various computing problems.',
          courseCode: 'CS 501',
          fee: 450,
          lessons: 24,
          createdAt: new Date(),
          updatedAt: new Date()
        },    
        {
          id: 2,
          name: 'Operating Systems',
          description:'This course delves into the implementation and design of modern operating systems, with topics including process synchronization, memory management, and file systems.',
          courseCode: 'CS 502',
          fee: 230,
          lessons: 12,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: 'Computer Networks',
          description: 'This course covers the fundamental principles of computer networking, such as network protocols, architecture, and security.',
          courseCode: 'CS 503',
          fee: 550,
          lessons: 45,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: 'Database Systems',
          description:"In this course, you'll learn about the design and implementation of relational databases, including topics such as data modeling, query optimization, and transaction management.",
          courseCode: 'CS 504',
          fee: 150,
          lessons: 8,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: 'Artificial Intelligence',
          description:'This course covers the theory and practical applications of artificial intelligence, including machine learning, natural language processing, and computer vision.',
          courseCode: 'CS 505',
          fee: 750,
          lessons: 46,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 6,
          name: 'Software Engineering ',
          description:'This course covers various principles and techniques related to software engineering, including project management, software design, and testing.',
          courseCode: 'CS 506',
          fee: 210,
          lessons: 12,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 7,
          name: 'Computer Graphics',
          description:'This course teaches principles and techniques related to computer graphics, including topics such as 3D modeling, rendering, and animation.',
          courseCode: 'CS 507',
          fee: 310,
          lessons: 12,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 8,
          name: 'Human-Computer Interaction',
          description:"In this course, you'll learn about the design and evaluation of interactive systems, including user interface design, usability testing, and user experience.",
          courseCode: 'CS 508',
          fee: 0,
          lessons: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 9,
          name: 'Distributed Systems',
          description:'This course covers topics related to the design and implementation of distributed systems, including fault tolerance, scalability, and distributed algorithms.',
          courseCode: 'CS 509',
          fee: 300,
          lessons: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 10,
          name: 'Computer Security',
          description:'This course focuses on the principles and practices of computer security, including network security, malware analysis, and cryptography.',
          courseCode: 'CS 510',
          fee: 435,
          lessons: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
  },

  down: (queryInterface, _Sequelize) => {
  return queryInterface.bulkDelete('courses', null, {})
  }
};
