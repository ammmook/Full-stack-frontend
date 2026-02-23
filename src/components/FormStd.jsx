import React, { useEffect, useState } from 'react';

const StudentForm = () => {
  // 1. กำหนด State ตาม Flow ใหม่ (Controlled Components)
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [students, setStudents] = useState([]);

  // 2. ฟังก์ชันดึงข้อมูลทั้งหมด (แยกออกมาเพื่อให้เรียกซ้ำได้ตอน Add เสร็จ)
  const fetchStudents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/student/list`);
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      setStudents(result);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // ดึงข้อมูลครั้งแรกเมื่อโหลดหน้า
  useEffect(() => {
    fetchStudents();
  }, []);

  // 3. ฟังก์ชันบันทึกข้อมูล (เทียบเท่า handleClick ในโค้ดของคุณ)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // โครงสร้างข้อมูลตามที่คุณต้องการ
    const student = { name, address };
    console.log("Payload to send:", student);

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/student/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
      });
      
      console.log("New Student added");
      
      // เคลียร์ค่าในช่อง Input หลังบันทึกสำเร็จ
      setName('');
      setAddress('');
      
      // เรียกข้อมูลใหม่มาอัปเดตตารางทันที
      fetchStudents();

    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight border-b pb-2">
          Add Student
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
              Student Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="studentName"
              required
              value={name} // ผูกค่ากับ State
              onChange={(e) => setName(e.target.value)} // อัปเดต State ทุกครั้งที่พิมพ์
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label htmlFor="studentAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Student Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="studentAddress"
              required
              value={address} // ผูกค่ากับ State
              onChange={(e) => setAddress(e.target.value)} // อัปเดต State ทุกครั้งที่พิมพ์
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
        Students
      </h1>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 md:p-8">
        {students.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            No students found.
          </p>
        ) : (
          <div className="space-y-4">
            {students.map((student) => (
              <div 
                key={student.id} 
                className="bg-white p-4 rounded-md shadow-md border border-gray-100 text-left"
              >
                <p className="text-sm font-semibold text-gray-900">
                  Id: <span className="font-normal">{student.id}</span>
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  Name: <span className="font-normal">{student.name}</span>
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  Address: <span className="font-normal">{student.address}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </main>
  );
};

export default StudentForm;
