import Header from './Header';
import Content from './Content';

const Course = ({ course, totalExercises }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <p style={{ fontWeight: 700 }}>Total of {totalExercises} exercises</p>
    </div>
  );
};

export default Course;
