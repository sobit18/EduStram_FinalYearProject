import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Card, Form, Input, Select, message } from "antd";
import {
  BookOutlined,
  ExperimentOutlined,
  CalculatorOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { addCourseApi } from "../api/course.api";
import { getTeacherApi } from "../api/teacher.api";
import { useLearning } from "../context/LearningContext";

//import teacher

const { Option } = Select;

const Addcourses = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      teacherId: "",
      class: undefined,
      faculty: undefined,
      subject: "",
      duration: "",
      chapters: "",
      level: undefined,
    },
  });

  const { teacher, setTeacher } = useLearning();
  console.log("teacher details is: ", teacher);

  React.useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getTeacherApi();
        setTeacher(response?.user); // response is expected to be an array

        console.log("teacher datails are:", response?.user);
      } catch (err) {
        console.error("Error fetching teachers", err);
        message.error("Failed to load teacher list");
      }
    };

    fetchTeachers();
  }, [setTeacher]);

  const selectedLevel = watch("level");
  const selectedFaculty = watch("faculty");

  // Reset faculty when class changes
  React.useEffect(() => {
    if (selectedLevel) {
      setValue("faculty", undefined);
    }
  }, [selectedLevel, setValue]);

  const onSubmit = async (data) => {
    console.log("add Teacher is submit: ", data);
    const response = await addCourseApi({ ...data });
    console.log("Response is: ", response);
    reset(); // This will clear the form after submission
    navigate("/admin/coursemanagement");
  };

  return (
    <Card
      title="Assign Course to teacher"
      // bordered={false}
      style={{
        maxWidth: 800,
        margin: "20px auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <Form.Item
            label="Teacher"
            validateStatus={errors.teacherId ? "error" : ""}
            help={errors.teacherId?.message}
          >
            <Controller
              name="teacherId"
              control={control}
              rules={{ required: "Please select a teacher!" }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select a teacher"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {Array.isArray(teacher) &&
                    teacher.length > 0 &&
                    teacher.map((t) => (
                      <Option key={t?._id} value={t?._id}>
                        {t?.userDetails?.fullName || (
                          <span style={{ color: "red" }}>Not present</span>
                        )}
                      </Option>
                    ))}
                </Select>
              )}
            />
          </Form.Item>

          {/* Class Selection */}
          <Form.Item
            label="Class"
            validateStatus={errors.level ? "error" : ""}
            help={errors.level?.message}
          >
            <Controller
              name="level"
              control={control}
              rules={{ required: "Please select grade!" }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select class"
                  suffixIcon={<BookOutlined />}
                >
                  <Option value="11">class 11</Option>
                  <Option value="12">class 12</Option>
                </Select>
              )}
            />
          </Form.Item>

          {/* Faculty Selection */}
          <Form.Item
            label="Faculty"
            validateStatus={errors.faculty ? "error" : ""}
            help={errors.faculty?.message}
          >
            <Controller
              name="faculty"
              control={control}
              rules={{ required: "Please select faculty!" }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select faculty"
                  disabled={!selectedLevel}
                  suffixIcon={
                    selectedLevel === "11" ? (
                      <ExperimentOutlined />
                    ) : (
                      <CalculatorOutlined />
                    )
                  }
                >
                  <Option value="science">Science</Option>
                  <Option value="management">Management</Option>
                </Select>
              )}
            />
          </Form.Item>
        </div>

        {/* Subject Input */}

        <Form.Item
          label="Course"
          validateStatus={errors.subject ? "error" : ""}
          help={errors.subject?.message}
        >
          <Controller
            name="subject"
            control={control}
            rules={{ required: "Please enter subject name!" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter subject name (e.g. Physics, Accountancy)"
                disabled={!selectedFaculty || !selectedLevel}
              />
            )}
          />
        </Form.Item>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          {/* Course Duration */}
          <Form.Item
            label="Duration (hours)"
            validateStatus={errors.duration ? "error" : ""}
            help={errors.duration?.message}
          >
            <Controller
              name="duration"
              control={control}
              rules={{
                required: "Please input duration!",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a valid number",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="Total course hours"
                />
              )}
            />
          </Form.Item>

          {/* Number of Chapters */}
          <Form.Item
            label="Total Chapters"
            validateStatus={errors.chapters ? "error" : ""}
            help={errors.chapters?.message}
          >
            <Controller
              name="chapters"
              control={control}
              rules={{
                required: "Please input number of chapters!",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a valid number",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="Number of chapters"
                />
              )}
            />
          </Form.Item>
        </div>

        <Form.Item style={{ marginTop: "24px" }}>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Create Course
          </Button>
        </Form.Item>
      </form>
    </Card>
  );
};

export default Addcourses;
