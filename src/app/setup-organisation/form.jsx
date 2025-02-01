import { Building2, Globe, FileText } from "lucide-react";
import { Button, Card, CardBody, CardHeader, Input, Textarea } from "@heroui/react";
import { Controller } from "react-hook-form";



function OrganizationSetupForm() {
  return (
    <Card>
    <CardHeader>
      <p className="text-2xl text-center font-semibold">Setup Your Organization</p>
      <p className="text-sm text-center text-gray-500 mt-2">
        Provide details about your company to get started.
      </p>
    </CardHeader>
    <CardBody className="px-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Company Name Field */}
        <motion.div variants={inputVariants}>
          <Controller
            name="companyName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                label="Company Name"
                variant="bordered"
                type="text"
                description="Enter your company's full name"
                endContent={<Building2 className="text-gray-400" />}
                errorMessage={errors.companyName?.message}
                isInvalid={!!errors.companyName}
              />
            )}
          />
        </motion.div>

        {/* Company Website URL Field */}
        <motion.div variants={inputVariants}>
          <Controller
            name="companyWebsite"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                label="Company Website"
                variant="bordered"
                type="url"
                description="Enter your company's website URL"
                endContent={<Globe className="text-gray-400" />}
                errorMessage={errors.companyWebsite?.message}
                isInvalid={!!errors.companyWebsite}
              />
            )}
          />
        </motion.div>

        {/* Company Description Field */}
        <motion.div variants={inputVariants}>
          <Controller
            name="companyDescription"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Textarea
                {...field}
                label="Company Description"
                variant="bordered"
                description="Describe your company in a few words"
                endContent={<FileText className="text-gray-400" />}
                errorMessage={errors.companyDescription?.message}
                isInvalid={!!errors.companyDescription}
              />
            )}
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          variants={inputVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            color="primary"
            variant="shadow"
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Setting Up..." : "Complete Setup"}
          </Button>
        </motion.div>
      </form>
    </CardBody>
  </Card>
  )
}

export default OrganizationSetupForm