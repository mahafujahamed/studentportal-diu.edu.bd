const studentIdInput = document.getElementById('student-id');
const semesterSelect = document.getElementById('semester');
const showResultButton = document.getElementById('show-result-btn');
const resultSection = document.getElementById('result-section');
const resultTableBody = document.getElementById('result-table-body');

const semesterData = {
    "semesters": [
        {
            "semester": "Fall-2024",
            "courses": [
                {
                    "courseCode": "MAT 101",
                    "courseTitle": "Mathematics I",
                    "credit": 3,
                    "grade": "B-",
                    "gradePoint": 2.75
                },
                {
                    "courseCode": "SE 111",
                    "courseTitle": "Computer Fundamentals",
                    "credit": 3,
                    "grade": "B+",
                    "gradePoint": 3.25
                },
                {
                    "courseCode": "ENG 101",
                    "courseTitle": "English I",
                    "credit": 3,
                    "grade": "B-",
                    "gradePoint": 2.75
                },
                {
                    "courseCode": "BNS 101",
                    "courseTitle": "Bangladesh Studies",
                    "credit": 3,
                    "grade": "B-",
                    "gradePoint": 2.75
                },
                {
                    "courseCode": "SE 112",
                    "courseTitle": "Computer Fundamentals Lab",
                    "credit": 1,
                    "grade": "B+",
                    "gradePoint": 3.25
                },
                {
                    "courseCode": "SE 113",
                    "courseTitle": "Introduction to Software Engineering",
                    "credit": 3,
                    "grade": "A",
                    "gradePoint": 3.75
                }
            ]
        }
        
        // ... data for other semesters (optional)
    ]
};

showResultButton.addEventListener('click', async () => {
    const studentId = studentIdInput.value;
    const semester = semesterSelect.value;

    if (studentId && semester) {
        try {
            const matchingSemester = semesterData.semesters.find(sem => sem.semester === semester);
            const matchingCourses = matchingSemester?.courses || []; // Use optional chaining to handle missing semester

            if (matchingCourses.length === 0) {
                alert('No results found for this semester.');
                return;
            }

            // Update UI to show results
            resultSection.classList.remove('hidden');
            populateResultSection(matchingCourses);
        } catch (error) {
            console.error('Error fetching results:', error);
            alert('Failed to fetch results. Please try again later.');
        }
    } else {
        alert('Please enter student ID and select semester.');
    }
});

function populateResultSection(courses) {
  resultTableBody.innerHTML = ''; // Clear existing content

  for (const course of courses) {
    const tableRow = document.createElement('tr');
    tableRow.classList.add('border-b', 'border-gray-200');

    const courseCodeCell = document.createElement('td');
    courseCodeCell.classList.add('px-4', 'py-4', 'text-left', 'bg-cyan-200', 'text-sm');
    courseCodeCell.textContent = course.courseCode;

    const courseTitleCell = document.createElement('td');
    courseTitleCell.classList.add('px-4', 'py-4', 'bg-blue-200', 'text-left', 'text-sm');
    courseTitleCell.textContent = course.courseTitle;

    const creditCell = document.createElement('td');
    creditCell.classList.add('px-4', 'py-4', 'bg-green-200', 'text-center', 'text-sm');
    creditCell.textContent = course.credit;

    const gradeCell = document.createElement('td');
    gradeCell.classList.add('px-4', 'py-4', 'bg-sky-300', 'text-center', 'text-sm');
    gradeCell.textContent = course.grade;

    const gradePointCell = document.createElement('td');
    gradePointCell.classList.add('px-4', 'py-4', 'bg-cyan-600', 'text-center', 'text-sm');
    gradePointCell.textContent = course.gradePoint;

    tableRow.appendChild(courseCodeCell);
    tableRow.appendChild(courseTitleCell);
    tableRow.appendChild(creditCell);
    tableRow.appendChild(gradeCell);
    tableRow.appendChild(gradePointCell);

    resultTableBody.appendChild(tableRow);
  }

  // Calculate and display additional statistics (optional)
  const totalCredits = courses.reduce((acc, course) => acc + course.credit, 0);
  const sgpa = calculateSGPA(courses); // Implement function to calculate SGPA based on grades and credits
  const statsElement = resultSection.querySelector('.text-md.text-red-500.space-x-4');
  statsElement.textContent = `Total Credit Requirement: 0 Total Credits Taken: ${totalCredits} SGPA: ${sgpa.toFixed(2)}`;
  
}

function calculateSGPA(courses) {
  let totalQualityPoints = 0;
  let totalCredits = 0;

  for (const course of courses) {
    const gradePoint = getGradePoint(course.grade);
    if (gradePoint !== undefined) { // Handle invalid grades
      totalQualityPoints += gradePoint * course.credit;
      totalCredits += course.credit;
    }
  }

  return totalCredits === 0 ? 0 : totalQualityPoints / totalCredits;
}

function getGradePoint(grade) {
    switch (grade.toUpperCase()) {
      case 'A':
        return 4.0;
      case 'A-':
        return 3.75;
      case 'B+':
        return 3.25;
      case 'B':
        return 3.0;
      case 'B-':
        return 2.75;
      case 'C+':
        return 2.5;
      case 'C':
        return 2.0;
      case 'D':
        return 1.0;
      case 'F':
        return 0.0;
      default:
        console.warn(`Invalid grade: ${grade}. Ignoring course.`);
        return undefined;
    }
  }