import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation(['home'])
  return (
    <footer className='bg-neutral-100 py-16'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-1'>
            <div>© 2023 Shopee. {t('home:all_rights_reserved')}.</div>
          </div>
          <div className='lg:col-span-2'>
            <div>
              {t('home:country')} & {t('home:region')}: Singapore | Indonesia | Đài Loan | Thái Lan | Malaysia | Việt
              Nam | Philippines | Brazil | México Colombia | Chile
            </div>
          </div>
        </div>
        <div className='mx-auto my-10 max-w-4xl text-xs'>
          <div className='grid grid-cols-4 gap-4 lg:grid-cols-4'>
            <p className='uppercase lg:col-span-1'>{t('home:privacy_policy')}</p>
            <p className='uppercase lg:col-span-1'>{t('home:operational_regulations')}</p>
            <p className='uppercase lg:col-span-1'>{t('home:delivery_policy')}</p>
            <p className='uppercase lg:col-span-1'>
              {t('home:policy_to_returned')} {t('home:and')} {t('home:refund')}
            </p>
          </div>
        </div>
        <div className='mt-10 text-center text-sm'>
          <div> {t('home:company_shoppe')}</div>
          <div className='mt-6'>
            {t('home:location')}: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba
            Đình, Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </div>
          <div className='mt-2'>
            {t('home:responsible_for_content_management')}: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
          </div>
          <div className='mt-2'>
            {t('home:business_code')}: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
          </div>
          <div className='mt-2'>© 2015 - {t('home:copyright_belongs_to_the_company_shoppe')}</div>
        </div>
      </div>
    </footer>
  )
}
