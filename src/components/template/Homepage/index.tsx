import { LockOutlined } from '@ant-design/icons';
import { App, Button, Form, Input } from 'antd';
import clsx from 'clsx';
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
const qrCodeUrl = 'https://hexdocs.pm/qr_code/docs/qrcode.svg';
const accountAddress = '0123456789';
const paymentBank = 'Techcombank';

const thousandSeperator = ',';

function PaymentForm() {
  const { notification } = App.useApp();
  const [formControl] = Form.useForm<IPaymentForm>();

  const [isGettingQRCode, setIsGettingQRCode] = React.useState(false);
  const [isShowQRCode, setIsShowQRCode] = React.useState(false);
  const [qrCodeLink, setQrCodeLink] = React.useState('');
  const [paymentTransferContent, setPaymentTransferContent] = React.useState('');
  const [isDisabledQRCode, setIsDisabledQRCode] = React.useState(false);

  function paymentHandler(formValue: IPaymentForm) {
    console.log('FormValue: ', formValue);

    const { amount } = formValue;

    const normalizedAmount = amount.replaceAll(',', '');

    console.log('normalizedAmount', normalizedAmount);

    setIsGettingQRCode(true);

    setTimeout(() => {
      setIsDisabledQRCode(false);
      setIsGettingQRCode(false);
      setIsShowQRCode(true);
      setQrCodeLink(qrCodeUrl);
      setPaymentTransferContent('123456789');
    }, 1500);
  }

  React.useEffect(() => {
    if (qrCodeLink && paymentTransferContent) {
      const timer = setTimeout(() => {
        notification.success({
          message: 'Thanh toán thành công',
        });
        setIsDisabledQRCode(true);
      }, 10000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification, paymentTransferContent, qrCodeLink]);

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
      <div className="flex-auto">
        {isShowQRCode && (
          <div className="px-6 py-5">
            <p className="mt-0 text-center text-lg font-bold">Quét mã QR bên dưới để thanh toán</p>
            <img
              src={qrCodeLink}
              alt=""
              width={300}
              height={300}
              className={clsx('my-auto aspect-1 h-[300px] w-[300px]', {
                'blur-md': isDisabledQRCode,
              })}
            />
            <div>
              <p className="my-2">Hoặc chuyển tiền vào tài khoản:</p>
              <p className="my-2">Ngân hàng: {paymentBank}</p>
              <p className="my-2">Số tài khoản: {accountAddress}</p>
              <p className="my-2">Nội dung chuyển khoản: {paymentTransferContent}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentForm;
