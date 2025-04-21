import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Job, JobStatus } from '../../types';

interface JobFormProps {
  defaultValues?: Partial<Job>;
  onSubmit: (data: Partial<Job>) => void;
  isSubmitting?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({
  defaultValues = {},
  onSubmit,
  isSubmitting = false,
}) => {
  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors } 
  } = useForm<Partial<Job>>({
    defaultValues: {
      company: '',
      position: '',
      location: '',
      status: 'applied',
      dateApplied: new Date().toISOString().split('T')[0],
      ...defaultValues,
    },
  });
  
  const statusOptions: { value: JobStatus; label: string }[] = [
    { value: 'applied', label: 'Applied' },
    { value: 'interviewing', label: 'Interviewing' },
    { value: 'offer', label: 'Offer' },
    { value: 'rejected', label: 'Rejected' },
  ];

  const handleFormSubmit = (data: Partial<Job>) => {
    // Format dateApplied to ISO string if it's just a date string
    if (data.dateApplied && !data.dateApplied.includes('T')) {
      data.dateApplied = new Date(data.dateApplied).toISOString();
    }
    
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Company */}
          <div>
            <label htmlFor="company" className="form-label">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              id="company"
              className="form-input"
              {...register('company', { required: 'Company is required' })}
            />
            {errors.company && (
              <p className="form-error">{errors.company.message}</p>
            )}
          </div>

          {/* Position */}
          <div>
            <label htmlFor="position" className="form-label">
              Position <span className="text-red-500">*</span>
            </label>
            <input
              id="position"
              className="form-input"
              {...register('position', { required: 'Position is required' })}
            />
            {errors.position && (
              <p className="form-error">{errors.position.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="form-label">Location</label>
            <input
              id="location"
              className="form-input"
              placeholder="City, State or Remote"
              {...register('location')}
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="form-label">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              className="form-select"
              {...register('status', { required: 'Status is required' })}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Date Applied */}
          <div>
            <label htmlFor="dateApplied" className="form-label">
              Date Applied <span className="text-red-500">*</span>
            </label>
            <Controller
              name="dateApplied"
              control={control}
              rules={{ required: 'Date applied is required' }}
              render={({ field }) => (
                <input
                  id="dateApplied"
                  type="date"
                  className="form-input"
                  value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            {errors.dateApplied && (
              <p className="form-error">{errors.dateApplied.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {/* URL */}
          <div>
            <label htmlFor="url" className="form-label">Job URL</label>
            <input
              id="url"
              className="form-input"
              placeholder="https://example.com/job-posting"
              {...register('url')}
            />
          </div>

          {/* Salary */}
          <div>
            <label htmlFor="salary" className="form-label">Salary Range</label>
            <input
              id="salary"
              className="form-input"
              placeholder="e.g. $80,000 - $100,000"
              {...register('salary')}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="form-label">Job Description</label>
            <textarea
              id="description"
              className="form-textarea"
              placeholder="Brief description of the role"
              {...register('description')}
            />
          </div>

          {/* Next Steps */}
          <div>
            <label htmlFor="nextSteps" className="form-label">Next Steps</label>
            <input
              id="nextSteps"
              className="form-input"
              placeholder="e.g. Follow up in one week"
              {...register('nextSteps')}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Name */}
          <div>
            <label htmlFor="contactName" className="form-label">Contact Name</label>
            <input
              id="contactName"
              className="form-input"
              {...register('contactName')}
            />
          </div>

          {/* Contact Email */}
          <div>
            <label htmlFor="contactEmail" className="form-label">Contact Email</label>
            <input
              id="contactEmail"
              type="email"
              className="form-input"
              {...register('contactEmail', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.contactEmail && (
              <p className="form-error">{errors.contactEmail.message}</p>
            )}
          </div>

          {/* Contact Phone */}
          <div>
            <label htmlFor="contactPhone" className="form-label">Contact Phone</label>
            <input
              id="contactPhone"
              className="form-input"
              {...register('contactPhone')}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
        
        <div>
          <textarea
            id="notes"
            className="form-textarea h-32"
            placeholder="Add any additional notes or details about this application"
            {...register('notes')}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button type="button" className="btn btn-secondary">
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Application'}
        </button>
      </div>
    </form>
  );
};

export default JobForm;