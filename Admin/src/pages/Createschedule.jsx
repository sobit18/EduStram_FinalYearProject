import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Card, Form, Input, Select, message } from "antd";
import {
  BookOutlined,
  ExperimentOutlined,
  CalculatorOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import { addCourseApi } from "../api/course.api";
import { getTeacherApi } from "../api/teacher.api";
import { CreateScheduleApi } from "../api/schedule.api";
import { useLearning } from "../context/LearningContext";


//import teacher

const { Option } = Select;

const Createschedule = () => {
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
      class: "",
      faculty: "",
      subject: "",
      endTime: "",
      startTime: "",
      level: "",
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
    const response = await CreateScheduleApi({ ...data });
    console.log("Response is: ", response);
    reset(); // This will clear the form after submission
    navigate("/admin/schedulemanagement");
  };

  return (
    <Card
      title="Create Schedule"
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

        {/* Time Inputs */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  }}
>
  {/* Start Time */}
  <Form.Item
    label="Start Time"
    validateStatus={errors.startTime ? "error" : ""}
    help={errors.startTime?.message}
  >
    <Controller
      name="startTime"
      control={control}
      rules={{ required: "Please select start time!" }}
      render={({ field }) => (
        <input
          {...field}
          type="time"
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #d9d9d9",
            borderRadius: "6px",
          }}
        />
      )}
    />
  </Form.Item>

  {/* End Time */}
  <Form.Item
    label="End Time"
    validateStatus={errors.endTime ? "error" : ""}
    help={errors.endTime?.message}
  >
    <Controller
      name="endTime"
      control={control}
      rules={{ required: "Please select end time!" }}
      render={({ field }) => (
        <input
          {...field}
          type="time"
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #d9d9d9",
            borderRadius: "6px",
          }}
        />
      )}
    />
  </Form.Item>
</div>


        

        <Form.Item style={{ marginTop: "24px" }}>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Create Schedule
          </Button>
        </Form.Item>
      </form>
    </Card>
  );
};

export default Createschedule;
