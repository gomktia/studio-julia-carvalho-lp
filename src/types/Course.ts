export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  image: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface EnrollmentFormData {
  name: string;
  email: string;
  phone: string;
  courseId: string;
  message?: string;
}
