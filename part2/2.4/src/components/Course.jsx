import Header from './Header';
import Content from './Content';

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <p style={{ fontWeight: 700 }}>Total of {course.totalExercises} exercises</p>
    </div>
  );
};

export default Course;
