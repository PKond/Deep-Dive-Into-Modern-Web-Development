import Part from './Part';

const Content = ({ course }) => {
  console.log("🚀 ~ Content ~ course:", course);
  return (
    <>
      {course.parts.map((item) => {
        console.log("🚀 ~ Content ~ item:", item);
        return (
          <Part key={item.id} name={item.name} exercises={item.exercises} />
        );
      })}
    </>
  );
};

export default Content;
