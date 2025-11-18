import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, Upload, Select, message } from "antd";
import {
  UploadOutlined,
  FilePdfOutlined,
  BookOutlined,
  ExperimentOutlined,
  CalculatorOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

// Sample data for subjects based on faculty and class
const subjectData = {
  Science: {
    11: ["Physics", "Chemistry", "Biology", "Mathematics"],
    12: ["Physics", "Chemistry", "Biology", "Mathematics"],
  },
  Management: {
    11: ["Accountancy", "Economics", "Business Studies"],
    12: ["Accountancy", "Economics", "Business Mathematics"],
  },
};

const Addcontent = () => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [availableSubjects, setAvailableSubjects] = useState([]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      class: undefined,
      faculty: undefined,
      subject: undefined,
      chapterNo: "",
      chapterTitle: "",
    //   description: "",
    },
  });

  const selectedClass = watch("class");
  const selectedFaculty = watch("faculty");

  // Handle class change
  React.useEffect(() => {
    if (selectedClass) {
      setValue("faculty", undefined);
      setValue("subject", undefined);
      setAvailableSubjects([]);
    }
  }, [selectedClass, setValue]);

  // Handle faculty change
  React.useEffect(() => {
    if (selectedFaculty && selectedClass) {
      setAvailableSubjects(subjectData[selectedFaculty][selectedClass]);
      setValue("subject", undefined);
    }
  }, [selectedFaculty, selectedClass, setValue]);

  // PDF upload props
  const uploadProps = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      if (file.type !== "application/pdf") {
        message.error("You can only upload PDF files!");
        return false;
      }
      setFileList([file]);
      return false; // Prevent auto upload
    },
    fileList,
    accept: ".pdf",
    maxCount: 1,
  };

  const onSubmit = async (data) => {
    if (fileList.length === 0) {
      message.error("Please upload a PDF file!");
      return;
    }

    setUploading(true);

    try {
      // Here you would typically upload to your backend
      const formData = new FormData();
      formData.append("class", data.class);
      formData.append("faculty", data.faculty);
      formData.append("subject", data.subject);
      formData.append("chapterNo", data.chapterNo);
      formData.append("chapterTitle", data.chapterTitle);
    //   formData.append("description", data.description);
      formData.append("pdfFile", fileList[0]);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      message.success("Content added successfully!");
      reset();
      setFileList([]);
      setAvailableSubjects([]);

      // Redirect to course management after 1.5 seconds
      setTimeout(() => {
        navigate("/admin/contentmanagement");
      }, 1500);
    } catch (error) {
      message.error("Failed to add content. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card
      title="Add Chapter Content"
    //   bordered={false}
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
          {/* Class Selection */}
          <Form.Item
            label="Level"
            validateStatus={errors.class ? "error" : ""}
            help={errors.class?.message}
          >
            <Controller
              name="level"
              control={control}
              rules={{ required: "Please select class!" }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select class"
                  suffixIcon={<BookOutlined />}
                >
                  <Option value="11">Grade 11</Option>
                  <Option value="12">Grade 12</Option>
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
                  disabled={!selectedClass}
                  suffixIcon={
                    selectedClass === "11" ? (
                      <ExperimentOutlined />
                    ) : (
                      <CalculatorOutlined />
                    )
                  }
                >
                  <Option value="Science">Science</Option>
                  <Option value="Management">Management</Option>
                </Select>
              )}
            />
          </Form.Item>
        </div>

        {/* Subject Selection */}
        <Form.Item
          label="Subject"
          validateStatus={errors.subject ? "error" : ""}
          help={errors.subject?.message}
        >
          <Controller
            name="subject"
            control={control}
            rules={{ required: "Please select subject!" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select subject"
                disabled={!selectedFaculty || !selectedClass}
              >
                {availableSubjects.map((subject) => (
                  <Option key={subject} value={subject}>
                    {subject}
                  </Option>
                ))}
              </Select>
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
          {/* Chapter Number */}
          <Form.Item
            label="Chapter No"
            validateStatus={errors.chapterNo ? "error" : ""}
            help={errors.chapterNo?.message}
          >
            <Controller
              name="chapterNo"
              control={control}
              rules={{
                required: "Please enter chapter number!",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a valid number",
                },
              }}
              render={({ field }) => (
                <Input {...field} type="number" placeholder="Chapter number" />
              )}
            />
          </Form.Item>

          {/* Chapter Title */}
          <Form.Item
            label="Chapter Title"
            validateStatus={errors.chapterTitle ? "error" : ""}
            help={errors.chapterTitle?.message}
          >
            <Controller
              name="chapterTitle"
              control={control}
              rules={{ required: "Please enter chapter title!" }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter chapter title" />
              )}
            />
          </Form.Item>
        </div>

        {/* Chapter Description */}
        {/* <Form.Item
          label="Description"
          validateStatus={errors.description ? 'error' : ''}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            rules={{ required: 'Please enter description!' }}
            render={({ field }) => (
              <TextArea 
                {...field}
                rows={4}
                placeholder="Enter chapter description"
              />
            )}
          />
        </Form.Item> */}

        {/* PDF Upload */}
        <Form.Item
          label="PDF Content"
          required
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Select PDF File</Button>
          </Upload>
          <div style={{ marginTop: 8, color: '#666' }}>
            <FilePdfOutlined /> Only PDF files are accepted
          </div>
        </Form.Item>

        <Form.Item style={{ marginTop: "24px" }}>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Create Content
          </Button>
        </Form.Item>
      </form>
    </Card>
  );
};

export default Addcontent;
