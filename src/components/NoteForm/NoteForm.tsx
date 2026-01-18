/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import type { CreateNoteData } from "../../types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onCancel: () => void;
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Title is required"),
  content: Yup.string().max(500, "Maximum 500 characters"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Tag is required"),
});

const initialValues: CreateNoteData = {
  title: "",
  content: "",
  tag: "Todo",
};

const NoteForm = ({ onCancel }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onCancel();
    },
    onError: (err: any) => {
      alert(`Error creating note: ${err.message}`);
    },
  });

  const handleSubmit = (
    values: CreateNoteData,
    { resetForm }: FormikHelpers<CreateNoteData>,
  ) => {
    mutation.mutate(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title" className={css.label}>
              Title
            </label>
            <Field name="title" type="text" id="title" className={css.input} />
            <ErrorMessage name="title" component="div" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content" className={css.label}>
              Content
            </label>
            <Field
              as="textarea"
              name="content"
              id="content"
              rows={5}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="div"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag" className={css.label}>
              Tag
            </label>
            <Field as="select" name="tag" id="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="div" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Create"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
