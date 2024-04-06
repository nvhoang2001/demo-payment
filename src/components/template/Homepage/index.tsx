import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import * as React from 'react';
import { NumericFormat } from 'react-number-format';

interface IPaymentForm {
  amount: string;
}

const TFormItem = Form.Item<IPaymentForm>;

const products = [
  {
    id: 1,
    name: 'Mũ',
    price: 500000,
    img: 'https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_2.625,f_auto,h_535,q_auto,w_950/c_pad,h_535,w_950/R1370284-01?pgw=1&pgwact=1',
  },
];

const thousandSeperator = ',';

function PaymentForm() {
  const [formControl] = Form.useForm<IPaymentForm>();

  const [isGettingQRCode, setIsGettingQRCode] = React.useState(false);

  function paymentHandler(formValue: IPaymentForm) {
    console.log('FormValue: ', formValue);

    const { amount } = formValue;

    const normalizedAmount = amount.replaceAll(',', '');

    console.log('normalizedAmount', normalizedAmount);

    setIsGettingQRCode(true);

    setTimeout(() => {
      setIsGettingQRCode(false);
    }, 1500);
  }

  return (
    <div className="flex h-full">
      <div className="h-full w-[500px] px-10 py-5">
        <h3 className="my-10 text-center text-2xl">
          <LockOutlined />
          <span className="ml-5 uppercase">Danh sách sản phẩm</span>
        </h3>

        <ul className="mx-0 my-0 list-none p-0">
          {products.map((product) => {
            return (
              <li
                key={product.id}
                className="flex items-start gap-5"
              >
                <img
                  src={product.img}
                  alt=""
                  width={200}
                />

                <div>
                  <p className="m-0">{product.name}</p>
                  {/* <p className="m-0">{product.price} VNĐ</p> */}
                </div>
              </li>
            );
          })}
        </ul>

        <Form
          form={formControl}
          layout="vertical"
          colon={false}
          requiredMark={false}
          className="mt-6"
          onFinish={paymentHandler}
        >
          <TFormItem
            label="Tổng tiền"
            name="amount"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số tiền',
              },
            ]}
          >
            <NumericFormat
              addonAfter="VNĐ"
              valueIsNumericString
              decimalScale={3}
              thousandSeparator={thousandSeperator}
              customInput={Input}
            />
          </TFormItem>

          <Button
            type="primary"
            className="w-full"
            htmlType="submit"
            size="large"
            loading={isGettingQRCode}
          >
            Thanh toán
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default PaymentForm;
