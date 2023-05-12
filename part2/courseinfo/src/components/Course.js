const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ parts }) => {
  let total = parts.reduce((current, next) => current + next.exercises, 0);
  return <b>Total of {total} exercises</b>;
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return parts.map((part) => <Part part={part} />);
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
