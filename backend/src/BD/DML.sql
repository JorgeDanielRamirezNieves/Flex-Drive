INSERT INTO role (id_role, name_role) VALUES
('5fb32b82-9f05-4ce8-8a75-cdb175d73073', 'user'),
('153c9307-1866-4848-9007-f9e02697d590', 'owner'),
('de1521c6-15da-45d0-933e-36642e161bcc', 'admin');

INSERT INTO document_types (id_document_type, name_document_type) VALUES
('b1c6d65c-cb1e-4896-acfe-cf786de49455', 'CC'),
('93562984-b58e-4740-9a3e-a510251b6664', 'Passport');

INSERT INTO notification_types (id_notification_type, name_notification_type) VALUES 
('76f66753-e818-4eef-8386-4c6f55aa9762', 'email'),
('9c10d654-e75d-40b8-bf8a-b5cfa2794320', 'sms'),
('c0f2a1b4-3d8e-4f5b-9a6c-7d0e5f1a2b8d', 'push'),
('6ff8f026-8c4d-4209-8edf-027bd7607837', 'in-app'),

INSERT INTO report_types (id_report_type, name_report_type) VALUES
('d07dcae8-4e4b-4620-8478-9bea31db8fe6', 'contact'),
('d26a7cac-554c-4828-a8ee-a3fb71ead312', 'petition'),
('ccc363e3-5510-43ec-9651-ba8315f87d5a', 'complaint'),
('5a10182f-7056-4285-a01e-956610e9021e', 'claims'),
('4f7c93dc-8320-4d1f-8931-96dc8e7c3f06', 'suggestion');

INSERT INTO contract_types (id_contract_type, name_contract_type) VALUES
('67553101-5862-4bf6-89b7-a1c471071f77', 'Cookies'),
('95ad1ad7-27f3-49fa-ae81-fbcdc41393cf', 'Terms and conditions'),
('f2b0a1c4-3d8e-4f5b-9a6c-7d0e5f1a2b8d', 'Service'),
('bc8262cd-500f-4df9-a86e-716308db3d77', 'support');

INSERT INTO sale_types (id_sale_type, name_sale_type) VALUES
('4f35a8ab-2f42-4df0-ba88-90ec84a7e5ce', 'hours'),
('45585f7e-2251-45ef-a2e5-dde7d7792388', 'day'),
('78dc830f-10bf-423c-843a-2cbb891edbf3', 'week'),
('12521e4d-2910-4990-b662-76250984a4b0', 'month'),
('03aadc52-a6e5-4b9c-8bf4-69b210eb997b', 'exclusive');

