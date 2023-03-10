<TextField
                            margin="dense"
                            name="Vendor Telephone Number"
                            label="vendor_Telephone_Number"
                            type="text"
                            value={newRequest.vendor_Telephone_Number}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="vendor_Email_Address"
                            label="Vendor Email Address"
                            type="text"
                            value={newRequest.vendor_Email_Address}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="vendor_Website"
                            label="Vendor Website"
                            type="text"
                            value={newRequest.vendor_Website}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="vendor_POC"
                            label="Vendor POC"
                            type="text"
                            value={newRequest.vendor_POC}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="vourseName"
                            label="Course Name"
                            type="text"
                            value={newRequest.vourseName}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="courseId"
                            label="Course ID"
                            type="text"
                            value={newRequest.courseId}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="training_StartDate"
                            label="Training Start Date"
                            type="text"
                            value={newRequest.training_StartDate}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="training_EndDate"
                            label="Training End Date"
                            type="text"
                            value={newRequest.training_EndDate}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="training_DutyHours"
                            label="Training Duty Hours"
                            type="text"
                            value={newRequest.training_DutyHours}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="training_NonDutyHours"
                            label="Training Non-Duty Hours"
                            type="text"
                            value={newRequest.training_NonDutyHours}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="training_PurposeType"
                            label="Training Purpose Type"
                            type="text"
                            value={newRequest.training_PurposeType}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="training_TypeCode"
                            label="Training Type Code"
                            type="text"
                            value={newRequest.training_TypeCode}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="training_SubTypeCode"
                            label="Training Sub-Type Code"
                            type="text"
                            value={newRequest.training_SubTypeCode}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="training_DeliveryTypeCode"
                            label="Training Delivery Type Code"
                            type="text"
                            value={newRequest.training_DeliveryTypeCode}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="training_DesignationTypeCode"
                            label="Training Designation Type Code"
                            type="text"
                            value={newRequest.training_DesignationTypeCode}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="training_Credit"
                            label="Training Credit"
                            type="text"
                            value={newRequest.training_Credit}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="training_CreditTypeCode"
                            label="Training Credit Type Code"
                            type="text"
                            value={newRequest.training_CreditTypeCode}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="training_AccreditionIdicator"
                            label="Training Accreditation Indicator"
                            type="text"
                            value={newRequest.training_AccreditionIdicator}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="continued_Service_Agreement_ExpirationDate"
                            label="Continued Service Agreement Expiration Date"
                            type="text"
                            value={newRequest.continued_Service_Agreement_ExpirationDate}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="training_Source_TypeCode"
                            label="Training Source Type Code"
                            type="text"
                            value={newRequest.training_Source_TypeCode}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="individual_or_Group_Training"
                            label="Individual or Group Training"
                            type="text"
                            value={newRequest.individual_or_Group_Training}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="student_Membership_ID"
                            label="Student Membership ID"
                            type="text"
                            value={newRequest.student_Membership_ID}
                            onChange={handleNewRequestChange}
                        />
                        <TextField
                            margin="dense"
                            name="skill_Learning_Objective"
                            label="Skill Learning Objective"
                            type="text"
                            value={newRequest.skill_Learning_Objective}
                            onChange={handleNewRequestChange}
                        />

                        <Tooltip title="Edit" placement="right"><IconButton onClick={() => handleEditClick(row)}><EditIcon /></IconButton></Tooltip></>)},