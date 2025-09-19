'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/layout/Layout';
import { mockTeacher } from '../data/mockTeacherData';
import { checkAuth } from '../../utils/auth';

interface LectureAbstract {
  id: string;
  date: Date;
  subject: string;
  class: string;
  topic: string;
  abstract: string;
  resources: string[];
  attendanceCount: number;
  totalStudents: number;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  class: string;
  dueDate: Date;
  totalMarks: number;
  instructions: string;
  resources: string[];
  status: 'draft' | 'published' | 'closed';
}

interface Quiz {
  id: string;
  title: string;
  subject: string;
  class: string;
  scheduledDate: Date;
  duration: number; // in minutes
  totalQuestions: number;
  totalMarks: number;
  instructions: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed';
}

export default function TeacherAcademicHub() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'abstracts' | 'assignments' | 'quizzes' | 'resources'>('abstracts');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<'abstract' | 'assignment' | 'quiz' | 'resource'>('abstract');

  // Form states
  const [abstractForm, setAbstractForm] = useState({
    subject: 'Data Structures & Algorithms',
    class: 'CS301-A',
    topic: '',
    abstract: '',
    resources: [] as string[]
  });

  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    description: '',
    subject: 'Data Structures & Algorithms',
    class: 'CS301-A',
    dueDate: '',
    totalMarks: 100,
    instructions: ''
  });

  const [quizForm, setQuizForm] = useState({
    title: '',
    subject: 'Data Structures & Algorithms',
    class: 'CS301-A',
    scheduledDate: '',
    duration: 60,
    totalQuestions: 10,
    totalMarks: 100,
    instructions: ''
  });

  const [mockAbstracts] = useState<LectureAbstract[]>([
    {
      id: 'abs-001',
      date: new Date('2024-12-13'),
      subject: 'Data Structures & Algorithms',
      class: 'CS301-A',
      topic: 'Binary Search Trees - Insertion and Deletion',
      abstract: 'Today we covered the fundamental operations of Binary Search Trees (BST). Students learned about the recursive nature of BST insertion and the three cases of node deletion: leaf node, node with one child, and node with two children. We implemented both operations in C++ and analyzed their time complexities.',
      resources: ['BST_Implementation.cpp', 'BST_Slides.pdf'],
      attendanceCount: 38,
      totalStudents: 40
    },
    {
      id: 'abs-002',
      date: new Date('2024-12-11'),
      subject: 'Data Structures & Algorithms',
      class: 'CS301-A',
      topic: 'AVL Trees and Balancing',
      abstract: 'Introduced self-balancing binary search trees with focus on AVL trees. Covered balance factor calculation, rotation operations (left, right, left-right, right-left), and the importance of maintaining balance for optimal search performance.',
      resources: ['AVL_Rotations.pdf', 'AVL_Visualization.html'],
      attendanceCount: 35,
      totalStudents: 40
    }
  ]);

  const [mockAssignments] = useState<Assignment[]>([
    {
      id: 'assign-001',
      title: 'Binary Tree Implementation Project',
      description: 'Implement a complete binary search tree with all basic operations',
      subject: 'Data Structures & Algorithms',
      class: 'CS301-A',
      dueDate: new Date('2024-12-25'),
      totalMarks: 100,
      instructions: 'Implement BST with insert, delete, search, inorder, preorder, and postorder traversals. Include proper error handling and documentation.',
      resources: ['Assignment_Template.zip', 'BST_Requirements.pdf'],
      status: 'published'
    },
    {
      id: 'assign-002',
      title: 'Graph Algorithms Analysis',
      description: 'Compare and analyze different graph traversal algorithms',
      subject: 'Data Structures & Algorithms',
      class: 'CS301-A',
      dueDate: new Date('2025-01-10'),
      totalMarks: 80,
      instructions: 'Implement BFS and DFS algorithms. Analyze time and space complexity for different graph representations.',
      resources: ['Graph_Dataset.txt'],
      status: 'draft'
    }
  ]);

  const [mockQuizzes] = useState<Quiz[]>([
    {
      id: 'quiz-001',
      title: 'Trees and BST Concepts',
      subject: 'Data Structures & Algorithms',
      class: 'CS301-A',
      scheduledDate: new Date('2024-12-20'),
      duration: 45,
      totalQuestions: 15,
      totalMarks: 30,
      instructions: 'Online quiz covering tree terminology, BST operations, and complexity analysis.',
      status: 'scheduled'
    }
  ]);

  useEffect(() => {
    const { isAuthenticated, userRole } = checkAuth();

    if (!isAuthenticated || userRole !== 'teacher') {
      router.push('/login');
      return;
    }
  }, [router]);

  const handleCreateAbstract = () => {
    console.log('Creating abstract:', abstractForm);
    alert('Lecture abstract created successfully!');
    setShowCreateModal(false);
    setAbstractForm({
      subject: 'Data Structures & Algorithms',
      class: 'CS301-A',
      topic: '',
      abstract: '',
      resources: []
    });
  };

  const handleCreateAssignment = () => {
    console.log('Creating assignment:', assignmentForm);
    alert('Assignment created successfully!');
    setShowCreateModal(false);
  };

  const handleCreateQuiz = () => {
    console.log('Creating quiz:', quizForm);
    alert('Quiz scheduled successfully!');
    setShowCreateModal(false);
  };

  const openCreateModal = (type: typeof createType) => {
    setCreateType(type);
    setShowCreateModal(true);
  };

  const classes = ['CS301-A', 'CS301-B', 'CS301-C'];
  const subjects = mockTeacher.subjects;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex mt-14 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Academic Content Hub</h1>
            <p className="text-gray-600 mt-1">
              Manage lecture abstracts, assignments, quizzes, and educational resources
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Today's Date</p>
            <p className="text-lg font-bold text-gray-900">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => openCreateModal('abstract')}
              className="flex flex-col items-center space-y-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <span className="text-2xl">📝</span>
              <span className="text-sm font-medium text-blue-800">Create Lecture Abstract</span>
            </button>
            <button
              onClick={() => openCreateModal('assignment')}
              className="flex flex-col items-center space-y-2 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <span className="text-2xl">📋</span>
              <span className="text-sm font-medium text-green-800">Create Assignment</span>
            </button>
            <button
              onClick={() => openCreateModal('quiz')}
              className="flex flex-col items-center space-y-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <span className="text-2xl">📊</span>
              <span className="text-sm font-medium text-purple-800">Schedule Quiz</span>
            </button>
            <button
              onClick={() => openCreateModal('resource')}
              className="flex flex-col items-center space-y-2 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
            >
              <span className="text-2xl">📚</span>
              <span className="text-sm font-medium text-orange-800">Upload Resources</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('abstracts')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'abstracts'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📝 Lecture Abstracts
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'assignments'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📋 Assignments
            </button>
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'quizzes'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📊 Quizzes
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'resources'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📚 Resources
            </button>
          </div>

          {/* Tab Content */}
          <div>
            {/* Lecture Abstracts */}
            {activeTab === 'abstracts' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-gray-900">Recent Lecture Abstracts</h4>
                  <button
                    onClick={() => openCreateModal('abstract')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    + Add Abstract
                  </button>
                </div>
                {mockAbstracts.map((abstract) => (
                  <div key={abstract.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h5 className="text-lg font-medium text-gray-900">{abstract.topic}</h5>
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                            {abstract.class}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {abstract.date.toLocaleDateString()} • {abstract.subject}
                        </p>
                        <p className="text-gray-700 mb-4">{abstract.abstract}</p>

                        {abstract.resources.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-900 mb-2">Resources:</p>
                            <div className="flex flex-wrap gap-2">
                              {abstract.resources.map((resource, index) => (
                                <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                  📎 {resource}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>👥 {abstract.attendanceCount}/{abstract.totalStudents} attended</span>
                          <span>📊 {((abstract.attendanceCount / abstract.totalStudents) * 100).toFixed(1)}% attendance</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                          ✏️ Edit
                        </button>
                        <button className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                          📤 Share
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Assignments */}
            {activeTab === 'assignments' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-gray-900">Assignments</h4>
                  <button
                    onClick={() => openCreateModal('assignment')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    + Create Assignment
                  </button>
                </div>
                {mockAssignments.map((assignment) => (
                  <div key={assignment.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h5 className="text-lg font-medium text-gray-900">{assignment.title}</h5>
                          <span className={`px-2 py-1 text-xs rounded ${
                            assignment.status === 'published' ? 'bg-green-100 text-green-700' :
                            assignment.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {assignment.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {assignment.class} • {assignment.subject} • Due: {assignment.dueDate.toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 mb-4">{assignment.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>📊 {assignment.totalMarks} marks</span>
                          <span>📅 Due in {Math.ceil((assignment.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                          ✏️ Edit
                        </button>
                        <button className="px-3 py-2 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">
                          📤 Publish
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quizzes */}
            {activeTab === 'quizzes' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-gray-900">Quizzes</h4>
                  <button
                    onClick={() => openCreateModal('quiz')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    + Schedule Quiz
                  </button>
                </div>
                {mockQuizzes.map((quiz) => (
                  <div key={quiz.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h5 className="text-lg font-medium text-gray-900">{quiz.title}</h5>
                          <span className={`px-2 py-1 text-xs rounded ${
                            quiz.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                            quiz.status === 'active' ? 'bg-green-100 text-green-700' :
                            quiz.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {quiz.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {quiz.class} • {quiz.subject} • {quiz.scheduledDate.toLocaleDateString()}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>⏰ {quiz.duration} minutes</span>
                          <span>❓ {quiz.totalQuestions} questions</span>
                          <span>📊 {quiz.totalMarks} marks</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                          ✏️ Edit
                        </button>
                        <button className="px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors">
                          📊 Results
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Resources */}
            {activeTab === 'resources' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-gray-900">Educational Resources</h4>
                  <button
                    onClick={() => openCreateModal('resource')}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    + Upload Resource
                  </button>
                </div>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <p className="text-gray-500 mb-4">No resources uploaded yet</p>
                  <button
                    onClick={() => openCreateModal('resource')}
                    className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Upload Your First Resource
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {createType === 'abstract' && '📝 Create Lecture Abstract'}
                    {createType === 'assignment' && '📋 Create Assignment'}
                    {createType === 'quiz' && '📊 Schedule Quiz'}
                    {createType === 'resource' && '📚 Upload Resource'}
                  </h3>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                {/* Abstract Form */}
                {createType === 'abstract' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                        <select
                          value={abstractForm.subject}
                          onChange={(e) => setAbstractForm({...abstractForm, subject: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {subjects.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                        <select
                          value={abstractForm.class}
                          onChange={(e) => setAbstractForm({...abstractForm, class: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {classes.map(cls => (
                            <option key={cls} value={cls}>{cls}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Today's Topic</label>
                      <input
                        type="text"
                        value={abstractForm.topic}
                        onChange={(e) => setAbstractForm({...abstractForm, topic: e.target.value})}
                        placeholder="e.g., Binary Search Trees - Insertion and Deletion"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lecture Abstract</label>
                      <textarea
                        value={abstractForm.abstract}
                        onChange={(e) => setAbstractForm({...abstractForm, abstract: e.target.value})}
                        rows={6}
                        placeholder="Describe what was covered in today's lecture, key concepts taught, examples used, and learning outcomes..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setShowCreateModal(false)}
                        className="px-4 py-2 text-sm bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreateAbstract}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Abstract
                      </button>
                    </div>
                  </div>
                )}

                {/* Assignment Form */}
                {createType === 'assignment' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Title</label>
                      <input
                        type="text"
                        value={assignmentForm.title}
                        onChange={(e) => setAssignmentForm({...assignmentForm, title: e.target.value})}
                        placeholder="e.g., Binary Tree Implementation Project"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                        <select
                          value={assignmentForm.subject}
                          onChange={(e) => setAssignmentForm({...assignmentForm, subject: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          {subjects.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                        <select
                          value={assignmentForm.class}
                          onChange={(e) => setAssignmentForm({...assignmentForm, class: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          {classes.map(cls => (
                            <option key={cls} value={cls}>{cls}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                        <input
                          type="date"
                          value={assignmentForm.dueDate}
                          onChange={(e) => setAssignmentForm({...assignmentForm, dueDate: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks</label>
                        <input
                          type="number"
                          value={assignmentForm.totalMarks}
                          onChange={(e) => setAssignmentForm({...assignmentForm, totalMarks: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={assignmentForm.description}
                        onChange={(e) => setAssignmentForm({...assignmentForm, description: e.target.value})}
                        rows={4}
                        placeholder="Brief description of the assignment..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                      <textarea
                        value={assignmentForm.instructions}
                        onChange={(e) => setAssignmentForm({...assignmentForm, instructions: e.target.value})}
                        rows={4}
                        placeholder="Detailed instructions for students..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setShowCreateModal(false)}
                        className="px-4 py-2 text-sm bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreateAssignment}
                        className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Create Assignment
                      </button>
                    </div>
                  </div>
                )}

                {/* Quiz Form */}
                {createType === 'quiz' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Title</label>
                      <input
                        type="text"
                        value={quizForm.title}
                        onChange={(e) => setQuizForm({...quizForm, title: e.target.value})}
                        placeholder="e.g., Trees and BST Concepts"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                        <select
                          value={quizForm.subject}
                          onChange={(e) => setQuizForm({...quizForm, subject: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                          {subjects.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                        <select
                          value={quizForm.class}
                          onChange={(e) => setQuizForm({...quizForm, class: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                          {classes.map(cls => (
                            <option key={cls} value={cls}>{cls}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Date</label>
                        <input
                          type="datetime-local"
                          value={quizForm.scheduledDate}
                          onChange={(e) => setQuizForm({...quizForm, scheduledDate: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                        <input
                          type="number"
                          value={quizForm.duration}
                          onChange={(e) => setQuizForm({...quizForm, duration: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Questions</label>
                        <input
                          type="number"
                          value={quizForm.totalQuestions}
                          onChange={(e) => setQuizForm({...quizForm, totalQuestions: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks</label>
                        <input
                          type="number"
                          value={quizForm.totalMarks}
                          onChange={(e) => setQuizForm({...quizForm, totalMarks: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                      <textarea
                        value={quizForm.instructions}
                        onChange={(e) => setQuizForm({...quizForm, instructions: e.target.value})}
                        rows={4}
                        placeholder="Instructions for students taking the quiz..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setShowCreateModal(false)}
                        className="px-4 py-2 text-sm bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreateQuiz}
                        className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Schedule Quiz
                      </button>
                    </div>
                  </div>
                )}

                {/* Resource Upload Form */}
                {createType === 'resource' && (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <div className="text-4xl mb-4">📎</div>
                      <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
                      <input type="file" multiple className="hidden" />
                      <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                        Browse Files
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                          {subjects.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                          <option>Lecture Slides</option>
                          <option>Reference Material</option>
                          <option>Code Examples</option>
                          <option>Practice Problems</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        rows={3}
                        placeholder="Brief description of the resource..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setShowCreateModal(false)}
                        className="px-4 py-2 text-sm bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                      <button className="px-4 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                        Upload Resource
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}